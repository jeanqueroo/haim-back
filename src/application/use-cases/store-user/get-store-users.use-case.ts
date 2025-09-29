import { Injectable, Inject } from '@nestjs/common';
import { StoreUser } from '../../../domain/entities/store-user.entity';
import type { StoreUserRepository } from '../../../domain/repositories/store-user.repository.interface';

@Injectable()
export class GetStoreUsersUseCase {
  constructor(@Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(storeId: number): Promise<StoreUser[]> {
    return await this.storeUserRepository.findByStoreId(storeId);
  }
}

@Injectable()
export class GetUserStoresUseCase {
  constructor(@Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(userId: number): Promise<StoreUser[]> {
    return await this.storeUserRepository.findByUserId(userId);
  }
}

@Injectable()
export class GetPrimaryUserByStoreUseCase {
  constructor(@Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(storeId: number): Promise<StoreUser | null> {
    return await this.storeUserRepository.findPrimaryUserByStoreId(storeId);
  }
}
