import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../model/use.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}



 async login(email: string, password: string) {
  const user = await this.usersService.validateUser(email, password);
  if (!user) throw new UnauthorizedException('Credenciales inválidas');

  return this.generateTokens(user);
 } 

  async refreshToken(userId: number, email: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    
    return this.generateTokens(user);
  }

  private generateTokens(user: any) {
    const payload = { sub: user.id, email: user.email };

    // Crear instancia del modelo User sin la contraseña
    const userData = new User();
    userData.id = user.id;
    userData.email = user.email;
    userData.firstName = user.firstName;
    userData.lastName = user.lastName;
    userData.address = user.address;
    userData.country = user.country;
    userData.age = user.age;
    userData.roles = user.roles;
    userData.gender = user.gender;
    // No incluimos la contraseña por seguridad

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: userData,
    };
  }
}