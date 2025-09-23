import { Injectable, Inject } from '@nestjs/common';
import type { UserRepository } from '../../../domain/repositories/user.repository.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
