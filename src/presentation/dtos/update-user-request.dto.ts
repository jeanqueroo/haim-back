import { IsEmail, IsString, IsNumber, IsArray, IsOptional, MinLength } from 'class-validator';

export class UpdateUserRequestDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @IsString()
  @IsOptional()
  gender?: string;
}
