import { Injectable, Inject } from '@nestjs/common';
import { Store } from '../../../domain/entities/store.entity';
import type { StoreRepository } from '../../../domain/repositories/store.repository.interface';
import { CreateStoreDto } from '../../dtos/create-store.dto';
import type { StoreUserRepository } from 'src/domain/repositories/store-user.repository.interface';
import { StoreUser } from 'src/domain/entities/store-user.entity';


@Injectable()
export class CreateStoreUseCase {
  constructor(@Inject('StoreRepository') private readonly storeRepository: StoreRepository,
   @Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

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
    
    const storeCreated = await this.storeRepository.create(store);    

    this.storeUserRepository.create(StoreUser.create({
      id: 0,
      storeId: storeCreated.id,
      userId: createStoreDto.userId,
      isPrimary: true,
      status: 'active',
      joinedAt: new Date(),
    }));
     
    return storeCreated;
  }
}
