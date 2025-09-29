import { IsInt, IsBoolean, Min } from 'class-validator';

export class AddUserToStoreRequestDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsBoolean()
  isPrimary: boolean = false;
}
