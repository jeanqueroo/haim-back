export class CreateUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly address: string,
    public readonly country: string,
    public readonly age: number,
    public readonly roles: string[],
    public readonly gender: string,
  ) {}
}
