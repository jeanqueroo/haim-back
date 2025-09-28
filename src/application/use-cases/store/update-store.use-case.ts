import { Injectable, Inject } from '@nestjs/common';
import { Store } from '../../../domain/entities/store.entity';
import type { StoreRepository } from '../../../domain/repositories/store.repository.interface';
import { UpdateStoreDto } from '../../dtos/update-store.dto';

@Injectable()
export class UpdateStoreUseCase {
  constructor(@Inject('StoreRepository') private readonly storeRepository: StoreRepository) {}

  async execute(id: number, updateStoreDto: UpdateStoreDto): Promise<Store | null> {
    return await this.storeRepository.update(id, updateStoreDto);
  }
}
