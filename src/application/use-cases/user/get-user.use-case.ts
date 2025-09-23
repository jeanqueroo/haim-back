import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';

@Injectable()
export class GetUserUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }
}

@Injectable()
export class GetUserByEmailUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
}

@Injectable()
export class GetAllUsersUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
