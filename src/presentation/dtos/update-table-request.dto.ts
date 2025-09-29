import { IsInt, IsEnum, IsOptional, Min } from 'class-validator';
import { TableStatus } from '../../domain/entities/table.entity';

export class UpdateTableRequestDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  tableNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsEnum(TableStatus)
  status?: TableStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  storeId?: number;
}
