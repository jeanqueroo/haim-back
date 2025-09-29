import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { CreateStoreUseCase } from '../../application/use-cases/store/create-store.use-case';
import { GetStoreUseCase, GetStoresByUserIdUseCase, GetAllStoresUseCase, GetStoresByNameUseCase } from '../../application/use-cases/store/get-store.use-case';
import { UpdateStoreUseCase } from '../../application/use-cases/store/update-store.use-case';
import { DeleteStoreUseCase } from '../../application/use-cases/store/delete-store.use-case';
import { AddUserToStoreUseCase } from '../../application/use-cases/store-user/add-user-to-store.use-case';
import { GetStoreUsersUseCase, GetUserStoresUseCase, GetPrimaryUserByStoreUseCase } from '../../application/use-cases/store-user/get-store-users.use-case';
import { RemoveUserFromStoreUseCase, SetPrimaryUserUseCase } from '../../application/use-cases/store-user/remove-user-from-store.use-case';
import { CreateStoreRequestDto } from '../dtos/create-store-request.dto';
import { UpdateStoreRequestDto } from '../dtos/update-store-request.dto';
import { AddUserToStoreRequestDto } from '../dtos/add-user-to-store-request.dto';
import { CreateStoreDto } from '../../application/dtos/create-store.dto';
import { UpdateStoreDto } from '../../application/dtos/update-store.dto';
import { AddUserToStoreDto } from '../../application/dtos/add-user-to-store.dto';

@Controller('stores')
export class StoreController {
  constructor(
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly getStoreUseCase: GetStoreUseCase,
    private readonly getStoresByUserIdUseCase: GetStoresByUserIdUseCase,
    private readonly getAllStoresUseCase: GetAllStoresUseCase,
    private readonly getStoresByNameUseCase: GetStoresByNameUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
    private readonly deleteStoreUseCase: DeleteStoreUseCase,
    private readonly addUserToStoreUseCase: AddUserToStoreUseCase,
    private readonly getStoreUsersUseCase: GetStoreUsersUseCase,
    private readonly getUserStoresUseCase: GetUserStoresUseCase,
    private readonly getPrimaryUserByStoreUseCase: GetPrimaryUserByStoreUseCase,
    private readonly removeUserFromStoreUseCase: RemoveUserFromStoreUseCase,
    private readonly setPrimaryUserUseCase: SetPrimaryUserUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor', 'chef', 'waiter')
  async findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    const stores = await this.getStoresByUserIdUseCase.execute(userId);
    return stores.map(store => store.toPublic());
  }

  @Get('search')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor', 'chef', 'waiter')
  async findByName(@Query('name') name: string) {
    if (!name) {
      return { message: 'El parámetro name es requerido' };
    }
    const stores = await this.getStoresByNameUseCase.execute(name);
    return stores.map(store => store.toPublic());
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user', 'vendedor', 'chef', 'waiter')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const store = await this.getStoreUseCase.execute(id);
    if (!store) {
      return { message: 'Tienda no encontrada' };
    }
    return store.toPublic();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
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
  @Roles('admin', 'user')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.deleteStoreUseCase.execute(id);
    if (!deleted) {
      return { message: 'Tienda no encontrada' };
    }
    return { message: 'Tienda eliminada exitosamente' };
  }

  // Store-User Management Endpoints

  @Post(':id/users')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  async addUserToStore(
    @Param('id', ParseIntPipe) storeId: number,
    @Body() addUserToStoreRequestDto: AddUserToStoreRequestDto,
  ) {
    const addUserToStoreDto = new AddUserToStoreDto(
      addUserToStoreRequestDto.userId,
      addUserToStoreRequestDto.isPrimary,
    );

    const storeUser = await this.addUserToStoreUseCase.execute(storeId, addUserToStoreDto);
    return storeUser.toPublic();
  }

  @Get(':id/users')
  @UseGuards(AuthGuard('jwt'))
  async getStoreUsers(@Param('id', ParseIntPipe) storeId: number) {
    const storeUsers = await this.getStoreUsersUseCase.execute(storeId);
    return storeUsers.map(storeUser => storeUser.toPublic());
  }

  @Get('user/:userId/stores')
  @UseGuards(AuthGuard('jwt'))
  async getUserStores(@Param('userId', ParseIntPipe) userId: number) {
    const userStores = await this.getUserStoresUseCase.execute(userId);
    return userStores.map(storeUser => storeUser.toPublic());
  }

  @Get(':id/primary-user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  async getPrimaryUser(@Param('id', ParseIntPipe) storeId: number) {
    const primaryUser = await this.getPrimaryUserByStoreUseCase.execute(storeId);
    if (!primaryUser) {
      return { message: 'No hay usuario principal asignado' };
    }
    return primaryUser.toPublic();
  }

  @Put(':id/users/:userId/set-primary')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  async setPrimaryUser(
    @Param('id', ParseIntPipe) storeId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const success = await this.setPrimaryUserUseCase.execute(storeId, userId);
    if (!success) {
      return { message: 'No se pudo establecer el usuario como principal' };
    }
    return { message: 'Usuario establecido como principal exitosamente' };
  }

  @Delete(':id/users/:userId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  async removeUserFromStore(
    @Param('id', ParseIntPipe) storeId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const success = await this.removeUserFromStoreUseCase.execute(storeId, userId);
    if (!success) {
      return { message: 'No se pudo remover el usuario de la tienda' };
    }
    return { message: 'Usuario removido de la tienda exitosamente' };
  }
}
