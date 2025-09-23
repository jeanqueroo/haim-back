import { IsEmail, IsString, IsNumber, IsArray, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  roles: string[];

  @IsString()
  @IsNotEmpty()
  gender: string;
}
