import { Injectable, Inject } from '@nestjs/common';
import { StoreUser } from '../../../domain/entities/store-user.entity';
import type { StoreUserRepository } from '../../../domain/repositories/store-user.repository.interface';
import { BulkAddUsersToStoreDto } from '../../dtos/bulk-add-users-to-store.dto';

@Injectable()
export class BulkAddUsersToStoreUseCase {
  constructor(@Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(storeId: number, bulkAddUsersToStoreDto: BulkAddUsersToStoreDto): Promise<StoreUser[]> {
    const primaryUserIds: number[] = [];

    // Primero, identificar todos los usuarios que serán marcados como primarios
    for (const userDto of bulkAddUsersToStoreDto.users) {
      if (userDto.isPrimary) {
        primaryUserIds.push(userDto.userId);
      }
    }

    // Si hay múltiples usuarios primarios, solo mantener el primero
    if (primaryUserIds.length > 1) {
      console.warn(`Múltiples usuarios primarios detectados para la tienda ${storeId}. Solo se establecerá el primero como primario.`);
      primaryUserIds.splice(1); // Mantener solo el primero
    }

    // Establecer el usuario primario si existe
    if (primaryUserIds.length > 0) {
      await this.storeUserRepository.setPrimaryUser(storeId, primaryUserIds[0]);
    }

    // Preparar todas las relaciones store-user para creación en lote
    const storeUsersToCreate = bulkAddUsersToStoreDto.users.map(userDto => {
      const isPrimary = primaryUserIds.length > 0 && userDto.userId === primaryUserIds[0];
      
      return StoreUser.create({
        id: 0, // Se asignará en el repositorio
        storeId,
        userId: userDto.userId,
        isPrimary,
        status: 'active',
        joinedAt: new Date(),
      });
    });

    // Crear todas las relaciones en una sola operación
    return await this.storeUserRepository.createBulk(storeUsersToCreate);
  }
}
