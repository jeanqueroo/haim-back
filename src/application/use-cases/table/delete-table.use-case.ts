import { Injectable, Inject } from '@nestjs/common';
import type { TableRepository } from '../../../domain/repositories/table.repository.interface';

@Injectable()
export class DeleteTableUseCase {
  constructor(@Inject('TableRepository') private readonly tableRepository: TableRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.tableRepository.delete(id);
  }
}
