import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return null;
    }

    // Si se proporciona una nueva contraseña, la hasheamos
    let hashedPassword = existingUser.password;
    if (updateUserDto.password) {
      hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Crear objeto de actualización
    const updateData: Partial<Omit<User, 'id'>> = {
      email: updateUserDto.email ?? existingUser.email,
      firstName: updateUserDto.firstName ?? existingUser.firstName,
      lastName: updateUserDto.lastName ?? existingUser.lastName,
      address: updateUserDto.address ?? existingUser.address,
      country: updateUserDto.country ?? existingUser.country,
      age: updateUserDto.age ?? existingUser.age,
      roles: updateUserDto.roles ?? existingUser.roles,
      gender: updateUserDto.gender ?? existingUser.gender,
      password: hashedPassword,
    };

    return await this.userRepository.update(id, updateData);
  }
}
