import { StoreUser } from '../../../domain/entities/store-user.entity';
import { StoreUserEntity } from '../entities/store-user.entity';

export class StoreUserMapper {
  static toDomain(entity: StoreUserEntity): StoreUser {
    return StoreUser.create({
      id: entity.id,
      storeId: entity.storeId,
      userId: entity.userId,
      isPrimary: entity.isPrimary,
      status: entity.status,
      joinedAt: entity.joinedAt,
    });
  }

  static toEntity(storeUser: StoreUser): Partial<StoreUserEntity> {
    return {
      id: storeUser.id,
      storeId: storeUser.storeId,
      userId: storeUser.userId,
      isPrimary: storeUser.isPrimary,
      status: storeUser.status,
      joinedAt: storeUser.joinedAt,
    };
  }
}
