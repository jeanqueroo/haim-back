import { Injectable, Inject } from '@nestjs/common';
import type { StoreUserRepository } from '../../../domain/repositories/store-user.repository.interface';

@Injectable()
export class RemoveUserFromStoreUseCase {
  constructor(@Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(storeId: number, userId: number): Promise<boolean> {
    return await this.storeUserRepository.removeUserFromStore(storeId, userId);
  }
}

@Injectable()
export class SetPrimaryUserUseCase {
  constructor(@Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(storeId: number, userId: number): Promise<boolean> {
    const result = await this.storeUserRepository.setPrimaryUser(storeId, userId);
    return result !== null;
  }
}
