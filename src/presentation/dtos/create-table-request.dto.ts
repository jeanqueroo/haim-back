import { IsInt, IsEnum, IsOptional, Min } from 'class-validator';
import { TableStatus } from '../../domain/entities/table.entity';

export class CreateTableRequestDto {
  @IsInt()
  @Min(1)
  tableNumber: number;

  @IsInt()
  @Min(1)
  capacity: number;

  @IsOptional()
  @IsEnum(TableStatus)
  status?: TableStatus;

  @IsInt()
  @Min(1)
  storeId: number;
}
