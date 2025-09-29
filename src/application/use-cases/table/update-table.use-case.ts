import { Injectable, Inject } from '@nestjs/common';
import { Table } from '../../../domain/entities/table.entity';
import type { TableRepository } from '../../../domain/repositories/table.repository.interface';
import { UpdateTableDto } from '../../dtos/update-table.dto';

@Injectable()
export class UpdateTableUseCase {
  constructor(@Inject('TableRepository') private readonly tableRepository: TableRepository) {}

  async execute(id: number, updateTableDto: UpdateTableDto): Promise<Table | null> {
    return await this.tableRepository.update(id, updateTableDto);
  }
}
