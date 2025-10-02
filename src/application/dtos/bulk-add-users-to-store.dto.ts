import { AddUserToStoreDto } from './add-user-to-store.dto';

export class BulkAddUsersToStoreDto {
  constructor(
    public readonly users: AddUserToStoreDto[],
  ) {}
}
