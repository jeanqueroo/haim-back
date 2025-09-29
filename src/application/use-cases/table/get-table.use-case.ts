import { Injectable, Inject } from '@nestjs/common';
import { Table } from '../../../domain/entities/table.entity';
import type { TableRepository } from '../../../domain/repositories/table.repository.interface';

@Injectable()
export class GetTableUseCase {
  constructor(@Inject('TableRepository') private readonly tableRepository: TableRepository) {}

  async execute(id: number): Promise<Table | null> {
    return await this.tableRepository.findById(id);
  }
}

@Injectable()
export class GetAllTablesUseCase {
  constructor(@Inject('TableRepository') private readonly tableRepository: TableRepository) {}

  async execute(): Promise<Table[]> {
    return await this.tableRepository.findAll();
  }
}

@Injectable()
export class GetTablesByStatusUseCase {
  constructor(@Inject('TableRepository') private readonly tableRepository: TableRepository) {}

  async execute(status: string): Promise<Table[]> {
    return await this.tableRepository.findByStatus(status);
  }
}

@Injectable()
export class GetTablesByStoreIdUseCase {
  constructor(@Inject('TableRepository') private readonly tableRepository: TableRepository) {}

  async execute(storeId: number): Promise<Table[]> {
    return await this.tableRepository.findByStoreId(storeId);
  }
}

@Injectable()
export class GetTablesByStoreIdAndStatusUseCase {
  constructor(@Inject('TableRepository') private readonly tableRepository: TableRepository) {}

  async execute(storeId: number, status: string): Promise<Table[]> {
    return await this.tableRepository.findByStoreIdAndStatus(storeId, status);
  }
}
