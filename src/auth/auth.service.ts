import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const user = await this.usersService.create(email, password);
    return { id: user.id, email: user.email };
  }

 async login(email: string, password: string) {
  const user = await this.usersService.validateUser(email, password);
  if (!user) throw new UnauthorizedException('Credenciales inválidas');

  return this.generateTokens(user.id, user.email);
 } 

  async refreshToken(userId: number, email: string) {
    return this.generateTokens(userId, email);
  }

  private generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}