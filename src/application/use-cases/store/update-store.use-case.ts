import { Injectable, Inject } from '@nestjs/common';
import { Store } from '../../../domain/entities/store.entity';
import type { StoreRepository } from '../../../domain/repositories/store.repository.interface';
import { UpdateStoreDto } from '../../dtos/update-store.dto';
import type { StoreUserRepository } from 'src/domain/repositories/store-user.repository.interface';

@Injectable()
export class UpdateStoreUseCase {
  constructor(@Inject('StoreRepository') private readonly storeRepository: StoreRepository,
  @Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(id: number, updateStoreDto: UpdateStoreDto): Promise<Store | null> {
    const storeUpdated = await this.storeRepository.update(id, updateStoreDto);

    const primaryUser = await this.storeUserRepository.findPrimaryUserByStoreId(id);
    if (primaryUser) {
      this.storeUserRepository.update(primaryUser.id, {
        storeId: id,
        userId: primaryUser.userId,
        isPrimary: true,
      });
    }
    return storeUpdated
  }
}
