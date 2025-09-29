import { Injectable, Inject } from '@nestjs/common';
import { StoreUser } from '../../../domain/entities/store-user.entity';
import type { StoreUserRepository } from '../../../domain/repositories/store-user.repository.interface';
import { AddUserToStoreDto } from '../../dtos/add-user-to-store.dto';

@Injectable()
export class AddUserToStoreUseCase {
  constructor(@Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(storeId: number, addUserToStoreDto: AddUserToStoreDto): Promise<StoreUser> {
    // Si se está estableciendo como primary, primero quitar el estado de primary de otros usuarios
    if (addUserToStoreDto.isPrimary) {
      await this.storeUserRepository.setPrimaryUser(storeId, addUserToStoreDto.userId);
    }

    // Crear la relación store-user
    const storeUser = StoreUser.create({
      id: 0, // Se asignará en el repositorio
      storeId,
      userId: addUserToStoreDto.userId,
      isPrimary: addUserToStoreDto.isPrimary,
      status: 'active',
      joinedAt: new Date(),
    });

    return await this.storeUserRepository.create(storeUser);
  }
}
