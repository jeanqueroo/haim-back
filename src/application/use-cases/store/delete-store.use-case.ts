import { Injectable, Inject } from '@nestjs/common';
import type { StoreRepository } from '../../../domain/repositories/store.repository.interface';

@Injectable()
export class DeleteStoreUseCase {
  constructor(@Inject('StoreRepository') private readonly storeRepository: StoreRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.storeRepository.delete(id);
  }
}
