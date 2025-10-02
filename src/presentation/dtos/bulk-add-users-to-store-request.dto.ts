import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { AddUserToStoreRequestDto } from './add-user-to-store-request.dto';

export class BulkAddUsersToStoreRequestDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Debe incluir al menos un usuario' })
  @ValidateNested({ each: true })
  @Type(() => AddUserToStoreRequestDto)
  users: AddUserToStoreRequestDto[];
}
