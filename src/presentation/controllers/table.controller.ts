import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { CreateTableUseCase } from '../../application/use-cases/table/create-table.use-case';
import { GetTableUseCase, GetAllTablesUseCase, GetTablesByStatusUseCase, GetTablesByStoreIdUseCase, GetTablesByStoreIdAndStatusUseCase } from '../../application/use-cases/table/get-table.use-case';
import { UpdateTableUseCase } from '../../application/use-cases/table/update-table.use-case';
import { DeleteTableUseCase } from '../../application/use-cases/table/delete-table.use-case';
import { CreateTableRequestDto } from '../dtos/create-table-request.dto';
import { UpdateTableRequestDto } from '../dtos/update-table-request.dto';
import { CreateTableDto } from '../../application/dtos/create-table.dto';
import { UpdateTableDto } from '../../application/dtos/update-table.dto';
import { TableStatus } from '../../domain/entities/table.entity';

@Controller('tables')
export class TableController {
  constructor(
    private readonly createTableUseCase: CreateTableUseCase,
    private readonly getTableUseCase: GetTableUseCase,
    private readonly getAllTablesUseCase: GetAllTablesUseCase,
    private readonly getTablesByStatusUseCase: GetTablesByStatusUseCase,
    private readonly getTablesByStoreIdUseCase: GetTablesByStoreIdUseCase,
    private readonly getTablesByStoreIdAndStatusUseCase: GetTablesByStoreIdAndStatusUseCase,
    private readonly updateTableUseCase: UpdateTableUseCase,
    private readonly deleteTableUseCase: DeleteTableUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor', 'chef')
  async create(@Body() createTableRequestDto: CreateTableRequestDto) {
    const createTableDto = new CreateTableDto(
      createTableRequestDto.tableNumber,
      createTableRequestDto.capacity,
      createTableRequestDto.status || TableStatus.FREE,
      createTableRequestDto.storeId,
    );

    const table = await this.createTableUseCase.execute(createTableDto);
    return table.toPublic();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor', 'chef', 'waiter')
  async findAll(
    @Query('status') status?: string,
    @Query('storeId') storeId?: string,
  ) {
    const storeIdNum = storeId ? parseInt(storeId) : undefined;
    
    if (storeIdNum && status) {
      const tables = await this.getTablesByStoreIdAndStatusUseCase.execute(storeIdNum, status);
      return tables.map(table => table.toPublic());
    }
    
    if (storeIdNum) {
      const tables = await this.getTablesByStoreIdUseCase.execute(storeIdNum);
      return tables.map(table => table.toPublic());
    }
    
    if (status) {
      const tables = await this.getTablesByStatusUseCase.execute(status);
      return tables.map(table => table.toPublic());
    }
    
    const tables = await this.getAllTablesUseCase.execute();
    return tables.map(table => table.toPublic());
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const table = await this.getTableUseCase.execute(id);
    if (!table) {
      return { message: 'Mesa no encontrada' };
    }
    return table.toPublic();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor', 'chef', 'waiter')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTableRequestDto: UpdateTableRequestDto,
  ) {
    const updateTableDto = new UpdateTableDto(
      updateTableRequestDto.tableNumber,
      updateTableRequestDto.capacity,
      updateTableRequestDto.status,
      updateTableRequestDto.storeId,
    );

    const table = await this.updateTableUseCase.execute(id, updateTableDto);
    if (!table) {
      return { message: 'Mesa no encontrada' };
    }
    return table.toPublic();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor', 'chef')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.deleteTableUseCase.execute(id);
    if (!deleted) {
      return { message: 'Mesa no encontrada' };
    }
    return { message: 'Mesa eliminada exitosamente' };
  }
}
