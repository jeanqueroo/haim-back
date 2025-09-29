import { IsEnum, IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { StoreType } from '../../domain/entities/store.entity';

export class CreateStoreRequestDto {
  @IsEnum(StoreType)
  @IsNotEmpty()
  storeType: StoreType;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

