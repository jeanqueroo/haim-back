import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { CreateStoreUseCase } from '../../application/use-cases/store/create-store.use-case';
import { GetStoreUseCase, GetStoresByUserIdUseCase, GetAllStoresUseCase } from '../../application/use-cases/store/get-store.use-case';
import { UpdateStoreUseCase } from '../../application/use-cases/store/update-store.use-case';
import { DeleteStoreUseCase } from '../../application/use-cases/store/delete-store.use-case';
import { CreateStoreRequestDto } from '../dtos/create-store-request.dto';
import { UpdateStoreRequestDto } from '../dtos/update-store-request.dto';
import { CreateStoreDto } from '../../application/dtos/create-store.dto';
import { UpdateStoreDto } from '../../application/dtos/update-store.dto';

@Controller('stores')
export class StoreController {
  constructor(
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly getStoreUseCase: GetStoreUseCase,
    private readonly getStoresByUserIdUseCase: GetStoresByUserIdUseCase,
    private readonly getAllStoresUseCase: GetAllStoresUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
    private readonly deleteStoreUseCase: DeleteStoreUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor')
  async create(@Body() createStoreRequestDto: CreateStoreRequestDto) {
    const createStoreDto = new CreateStoreDto(
      createStoreRequestDto.storeType,
      createStoreRequestDto.name,
      createStoreRequestDto.address,
      createStoreRequestDto.country,
      createStoreRequestDto.phone,
      createStoreRequestDto.userId,
    );

    const store = await this.createStoreUseCase.execute(createStoreDto);
    return store.toPublic();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async findAll() {
    const stores = await this.getAllStoresUseCase.execute();
    return stores.map(store => store.toPublic());
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard('jwt'))
  async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    const stores = await this.getStoresByUserIdUseCase.execute(userId);
    return stores.map(store => store.toPublic());
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const store = await this.getStoreUseCase.execute(id);
    if (!store) {
      return { message: 'Tienda no encontrada' };
    }
    return store.toPublic();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreRequestDto: UpdateStoreRequestDto,
  ) {
    const updateStoreDto = new UpdateStoreDto(
      updateStoreRequestDto.storeType,
      updateStoreRequestDto.name,
      updateStoreRequestDto.address,
      updateStoreRequestDto.country,
      updateStoreRequestDto.phone,
      updateStoreRequestDto.userId,
    );

    const store = await this.updateStoreUseCase.execute(id, updateStoreDto);
    if (!store) {
      return { message: 'Tienda no encontrada' };
    }
    return store.toPublic();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.deleteStoreUseCase.execute(id);
    if (!deleted) {
      return { message: 'Tienda no encontrada' };
    }
    return { message: 'Tienda eliminada exitosamente' };
  }
}
