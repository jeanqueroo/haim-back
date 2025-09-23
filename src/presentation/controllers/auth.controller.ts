import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/auth/login.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/auth/refresh-token.use-case';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginCredentials, RefreshTokenRequest } from '../../domain/entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    const credentials = new LoginCredentials(
      loginRequestDto.email,
      loginRequestDto.password,
    );

    return await this.loginUseCase.execute(credentials);
  }

  @Post('refresh')
  async refreshToken(@Body() body: { userId: number; email: string }) {
    const request = new RefreshTokenRequest(body.userId, body.email);
    return await this.refreshTokenUseCase.execute(request);
  }
}
