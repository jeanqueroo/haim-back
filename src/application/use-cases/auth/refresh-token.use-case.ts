import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { RefreshTokenRequest, AuthTokens } from '../../../domain/entities/auth.entity';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(request: RefreshTokenRequest): Promise<AuthTokens> {
    const user = await this.userRepository.findById(request.userId);
    
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (user.email !== request.email) {
      throw new UnauthorizedException('Token de refresh inválido');
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: any): AuthTokens {
    const payload = { 
      sub: user.id, 
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
