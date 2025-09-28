import { Store } from '../../../domain/entities/store.entity';
import { StoreEntity } from '../entities/store.entity';

export class StoreMapper {
  static toDomain(entity: StoreEntity): Store {
    return Store.create({
      id: entity.id,
      storeType: entity.storeType as any,
      name: entity.name,
      address: entity.address,
      country: entity.country,
      phone: entity.phone,
      userId: entity.userId,
    });
  }

  static toEntity(store: Store): Partial<StoreEntity> {
    return {
      id: store.id,
      storeType: store.storeType as any,
      name: store.name,
      address: store.address,
      country: store.country,
      phone: store.phone,
      userId: store.userId,
    };
  }
}
