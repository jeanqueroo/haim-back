import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear el usuario
    const user = User.create({
      id: 0, // Se asignará en el repositorio
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      address: createUserDto.address,
      country: createUserDto.country,
      age: createUserDto.age,
      roles: createUserDto.roles,
      gender: createUserDto.gender,
      password: hashedPassword,
    });

    return await this.userRepository.create(user);
  }
}
