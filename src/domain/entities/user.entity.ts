export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly address: string,
    public readonly country: string,
    public readonly age: number,
    public readonly roles: string[],
    public readonly gender: string,
    public readonly password?: string, // Solo para uso interno
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  // Método para crear una copia sin la contraseña (para respuestas públicas)
  toPublic(): Omit<User, 'password'> {
    const { password, ...publicUser } = this;
    return publicUser as Omit<User, 'password'>;
  }

  // Método estático para crear instancia desde datos primitivos
  static create(data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    age: number;
    roles: string[];
    gender: string;
    password?: string;
  }): User {
    return new User(
      data.id,
      data.email,
      data.firstName,
      data.lastName,
      data.address,
      data.country,
      data.age,
      data.roles,
      data.gender,
      data.password,
    );
  }
}
