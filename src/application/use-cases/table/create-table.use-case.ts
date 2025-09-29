import { Injectable, Inject } from '@nestjs/common';
import { Table } from '../../../domain/entities/table.entity';
import type { TableRepository } from '../../../domain/repositories/table.repository.interface';
import { CreateTableDto } from '../../dtos/create-table.dto';

@Injectable()
export class CreateTableUseCase {
  constructor(@Inject('TableRepository') private readonly tableRepository: TableRepository) {}

  async execute(createTableDto: CreateTableDto): Promise<Table> {
    // Crear la mesa
    const table = Table.create({
      id: 0, // Se asignará en el repositorio
      tableNumber: createTableDto.tableNumber,
      capacity: createTableDto.capacity,
      status: createTableDto.status,
      storeId: createTableDto.storeId,
    });

    return await this.tableRepository.create(table);
  }
}
