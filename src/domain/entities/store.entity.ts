export enum StoreType {
  RETAIL = 'retail',
  WHOLESALE = 'wholesale',
  ONLINE = 'online',
  PHARMACY = 'pharmacy',
  CLOTHING = 'clothing',
  ELECTRONICS = 'electronics',
  GROCERY = 'grocery',
  TRUCK = 'truck',
  STORE = 'store',
  SUPERMARKET = 'supermarket',
  RESTAURANT = 'restaurant',
  OTHER = 'other',
}

export class Store {
  constructor(
    public readonly id: number,
    public readonly storeType: StoreType,
    public readonly name: string,
    public readonly address: string,
    public readonly country: string,
    public readonly phone: string,
    public readonly userId: number,
  ) {}

  static create(data: {
    id: number;
    storeType: StoreType;
    name: string;
    address: string;
    country: string;
    phone: string;
    userId: number;
  }): Store {
    return new Store(
      data.id,
      data.storeType,
      data.name,
      data.address,
      data.country,
      data.phone,
      data.userId,
    );
  }

  toPublic() {
    return {
      id: this.id,
      storeType: this.storeType,
      name: this.name,
      address: this.address,
      country: this.country,
      phone: this.phone,
      userId: this.userId,
    };
  }
}
