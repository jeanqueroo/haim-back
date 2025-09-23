import { User } from '../../../domain/entities/user.entity';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return User.create({
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      address: entity.address,
      country: entity.country,
      age: entity.age,
      roles: entity.roles,
      gender: entity.gender,
      password: entity.password,
    });
  }

  static toEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    entity.id = domain.id;
    entity.email = domain.email;
    entity.firstName = domain.firstName;
    entity.lastName = domain.lastName;
    entity.address = domain.address;
    entity.country = domain.country;
    entity.age = domain.age;
    entity.roles = domain.roles;
    entity.gender = domain.gender;
    entity.password = domain.password || '';
    return entity;
  }

  static toDomainList(entities: UserEntity[]): User[] {
    return entities.map(entity => this.toDomain(entity));
  }
}
