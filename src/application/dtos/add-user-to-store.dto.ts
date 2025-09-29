export class AddUserToStoreDto {
  constructor(
    public readonly userId: number,
    public readonly isPrimary: boolean = false,
  ) {}
}
