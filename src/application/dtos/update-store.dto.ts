import { StoreType } from '../../domain/entities/store.entity';

export class UpdateStoreDto {
  constructor(
    public readonly storeType?: StoreType,
    public readonly name?: string,
    public readonly address?: string,
    public readonly country?: string,
    public readonly phone?: string,
    public readonly userId?: number,
  ) {}
}
