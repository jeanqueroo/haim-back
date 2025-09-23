export class AuthTokens {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly user: Omit<User, 'password'>,
  ) {}

  static create(data: {
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'password'>;
  }): AuthTokens {
    return new AuthTokens(
      data.accessToken,
      data.refreshToken,
      data.user,
    );
  }
}

export class LoginCredentials {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.email || !this.password) {
      throw new Error('Email y contraseña son requeridos');
    }

    if (!this.isValidEmail(this.email)) {
      throw new Error('Formato de email inválido');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export class RefreshTokenRequest {
  constructor(
    public readonly userId: number,
    public readonly email: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.userId || !this.email) {
      throw new Error('Token de refresh inválido');
    }
  }
}

// Importar User aquí para evitar dependencias circulares
import { User } from './user.entity';
