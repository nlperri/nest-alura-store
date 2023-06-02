import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async create(user: UserEntity) {
    this.users.push(user);
  }

  async get() {
    return this.users;
  }

  async emailExists(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user !== undefined;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('Invalid user id');
    }

    return user;
  }

  async update(id: string, data: Partial<UserEntity>) {
    const user = this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  async delete(id: string) {
    this.findById(id);

    this.users = this.users.filter((user) => user.id !== id);
  }
}
