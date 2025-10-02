import { User } from '../../domain/entities/user.entity';
import { StoreUser } from '../../domain/entities/store-user.entity';

export class StoreUserWithInfoDto {
  constructor(
    public readonly storeUser: StoreUser,
    public readonly user: User,
  ) {}

  toPublic() {
    return {
      storeUser: this.storeUser.toPublic(),
      user: this.user.toPublic(),
    };
  }
}
