import { TableStatus } from '../../domain/entities/table.entity';

export class UpdateTableDto {
  constructor(
    public readonly tableNumber?: number,
    public readonly capacity?: number,
    public readonly status?: TableStatus,
    public readonly storeId?: number,
  ) {}
}
