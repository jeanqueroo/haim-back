import { Injectable, Inject } from '@nestjs/common';
import { Store } from '../../../domain/entities/store.entity';
import type { StoreRepository } from '../../../domain/repositories/store.repository.interface';
import { CreateStoreDto } from '../../dtos/create-store.dto';

@Injectable()
export class CreateStoreUseCase {
  constructor(@Inject('StoreRepository') private readonly storeRepository: StoreRepository) {}

  async execute(createStoreDto: CreateStoreDto): Promise<Store> {
    // Crear la tienda
    const store = Store.create({
      id: 0, // Se asignará en el repositorio
      storeType: createStoreDto.storeType,
      name: createStoreDto.name,
      address: createStoreDto.address,
      country: createStoreDto.country,
      phone: createStoreDto.phone,
      userId: createStoreDto.userId,
    });

    return await this.storeRepository.create(store);
  }
}
