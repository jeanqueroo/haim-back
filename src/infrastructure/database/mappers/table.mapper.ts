import { Table } from '../../../domain/entities/table.entity';
import { TableEntity } from '../entities/table.entity';

export class TableMapper {
  static toDomain(entity: TableEntity): Table {
    return Table.create({
      id: entity.id,
      tableNumber: entity.tableNumber,
      capacity: entity.capacity,
      status: entity.status as any,
      storeId: entity.storeId,
    });
  }

  static toEntity(table: Table): Partial<TableEntity> {
    return {
      id: table.id,
      tableNumber: table.tableNumber,
      capacity: table.capacity,
      status: table.status as any,
      storeId: table.storeId,
    };
  }
}
