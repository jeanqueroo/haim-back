import { Injectable, Inject } from '@nestjs/common';
import { Store } from '../../../domain/entities/store.entity';
import type { StoreRepository } from '../../../domain/repositories/store.repository.interface';

@Injectable()
export class GetStoreUseCase {
  constructor(@Inject('StoreRepository') private readonly storeRepository: StoreRepository) {}

  async execute(id: number): Promise<Store | null> {
    return await this.storeRepository.findById(id);
  }
}

@Injectable()
export class GetStoresByUserIdUseCase {
  constructor(@Inject('StoreRepository') private readonly storeRepository: StoreRepository) {}

  async execute(userId: number): Promise<Store[]> {
    return await this.storeRepository.findByUserId(userId);
  }
}

@Injectable()
export class GetAllStoresUseCase {
  constructor(@Inject('StoreRepository') private readonly storeRepository: StoreRepository) {}

  async execute(): Promise<Store[]> {
    return await this.storeRepository.findAll();
  }
}
