import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserEntity } from './entities/user.entity';
import { User as UserModel } from '../model/use.model';

function mapEntityToModel(entity: UserEntity): UserModel {
  const model = new UserModel();
  model.id = entity.id;
  model.email = entity.email;
  model.password = entity.password;
  model.name = entity.name;
  model.last_name = entity.last_name;
  model.address = entity.address;
  model.country = entity.country;
  model.age = entity.age as unknown as number;
  model.role = entity.role as unknown as string[];
  model.gender = entity.gender;
  return model;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: {
    email: string;
    password: string;
    name: string;
    last_name: string;
    address: string;
    country: string;
    age: number;
    role: string[];
    gender: string;
  }): Promise<UserModel> {
    const user = await this.usersService.createFull(body);
    console.log(user);
    return mapEntityToModel(user);
  }

  @Get()
  async findAll(): Promise<UserModel[]> {
    const users = await this.usersService.findAll();
    return users.map(mapEntityToModel);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserModel | null> {
    const user = await this.usersService.findById(id);
    return user ? mapEntityToModel(user) : null;
  }
}


