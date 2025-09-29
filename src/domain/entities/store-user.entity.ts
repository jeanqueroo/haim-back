export class StoreUser {
  constructor(
    public readonly id: number,
    public readonly storeId: number,
    public readonly userId: number,
    public readonly isPrimary: boolean,
    public readonly status: string,
    public readonly joinedAt: Date,
  ) {}

  static create(data: {
    id: number;
    storeId: number;
    userId: number;
    isPrimary: boolean;
    status: string;
    joinedAt: Date;
  }): StoreUser {
    return new StoreUser(
      data.id,
      data.storeId,
      data.userId,
      data.isPrimary,
      data.status,
      data.joinedAt,
    );
  }

  toPublic() {
    return {
      id: this.id,
      storeId: this.storeId,
      userId: this.userId,
      isPrimary: this.isPrimary,
      status: this.status,
      joinedAt: this.joinedAt,
    };
  }
}
