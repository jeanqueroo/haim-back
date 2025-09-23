import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../infrastructure/auth/roles.decorator';
import { RolesGuard } from '../../infrastructure/auth/roles.guard';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case';
import { GetUserUseCase, GetAllUsersUseCase } from '../../application/use-cases/user/get-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.use-case';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { UpdateUserRequestDto } from '../dtos/update-user-request.dto';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async create(@Body() createUserRequestDto: CreateUserRequestDto) {
    const createUserDto = new CreateUserDto(
      createUserRequestDto.email,
      createUserRequestDto.password,
      createUserRequestDto.firstName,
      createUserRequestDto.lastName,
      createUserRequestDto.address,
      createUserRequestDto.country,
      createUserRequestDto.age,
      createUserRequestDto.roles,
      createUserRequestDto.gender,
    );

    const user = await this.createUserUseCase.execute(createUserDto);
    return user.toPublic();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async findAll() {
    const users = await this.getAllUsersUseCase.execute();
    return users.map(user => user.toPublic());
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.getUserUseCase.execute(id);
    if (!user) {
      return { message: 'Usuario no encontrado' };
    }
    return user.toPublic();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    const updateUserDto = new UpdateUserDto(
      updateUserRequestDto.email,
      updateUserRequestDto.password,
      updateUserRequestDto.firstName,
      updateUserRequestDto.lastName,
      updateUserRequestDto.address,
      updateUserRequestDto.country,
      updateUserRequestDto.age,
      updateUserRequestDto.roles,
      updateUserRequestDto.gender,
    );

    const user = await this.updateUserUseCase.execute(id, updateUserDto);
    if (!user) {
      return { message: 'Usuario no encontrado' };
    }
    return user.toPublic();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.deleteUserUseCase.execute(id);
    if (!deleted) {
      return { message: 'Usuario no encontrado' };
    }
    return { message: 'Usuario eliminado exitosamente' };
  }
}
