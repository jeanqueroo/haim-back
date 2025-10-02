import { Injectable, Inject } from '@nestjs/common';
import { StoreUserWithInfoDto } from '../../dtos/store-user-with-info.dto';
import { User } from '../../../domain/entities/user.entity';
import type { StoreUserRepository } from '../../../domain/repositories/store-user.repository.interface';

@Injectable()
export class GetStoreUsersWithInfoUseCase {
  constructor(@Inject('StoreUserRepository') private readonly storeUserRepository: StoreUserRepository) {}

  async execute(storeId: number): Promise<StoreUserWithInfoDto[]> {
    const storeUsersWithUserInfo = await this.storeUserRepository.findByStoreIdWithUserInfo(storeId);
    
    return storeUsersWithUserInfo.map(({ storeUser, user }) => {
      // Convert the user entity to domain User object
      const userDomain = User.create({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        country: user.country,
        age: user.age,
        roles: user.roles,
        gender: user.gender,
      });

      return new StoreUserWithInfoDto(storeUser, userDomain);
    });
  }
}
