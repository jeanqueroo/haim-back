export enum TableStatus {
  FREE = 'free',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved',
}

export class Table {
  constructor(
    public readonly id: number,
    public readonly tableNumber: number,
    public readonly capacity: number,
    public readonly status: TableStatus,
    public readonly storeId: number,
  ) {}

  static create(data: {
    id: number;
    tableNumber: number;
    capacity: number;
    status: TableStatus;
    storeId: number;
  }): Table {
    return new Table(
      data.id,
      data.tableNumber,
      data.capacity,
      data.status,
      data.storeId,
    );
  }

  toPublic() {
    return {
      id: this.id,
      tableNumber: this.tableNumber,
      capacity: this.capacity,
      status: this.status,
      storeId: this.storeId,
    };
  }
}
