import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { LoginCredentials, AuthTokens } from '../../../domain/entities/auth.entity';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(credentials: LoginCredentials): Promise<AuthTokens> {
    const user = await this.userRepository.validateCredentials(
      credentials.email,
      credentials.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: any): AuthTokens {
    const payload = { 
      email: user.email, 
      roles: user.roles 
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return AuthTokens.create({
      accessToken,
      refreshToken,
      user: user.toPublic(),
    });
  }
}
