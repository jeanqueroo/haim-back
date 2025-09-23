import { AuthTokens, LoginCredentials, RefreshTokenRequest } from '../../domain/entities/auth.entity';

export interface AuthServiceInterface {
  login(credentials: LoginCredentials): Promise<AuthTokens>;
  refreshToken(request: RefreshTokenRequest): Promise<AuthTokens>;
}
