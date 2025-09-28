import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { StoreType } from '../../domain/entities/store.entity';

export class UpdateStoreRequestDto {
  @IsEnum(StoreType)
  @IsOptional()
  storeType?: StoreType;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
