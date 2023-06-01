import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  async create(user) {
    this.users.push(user);
  }

  async get() {
    return this.users;
  }

  async emailExists(email: string) {
    const user = this.users.find((user) => user.email === email);

    return user !== undefined;
  }
}
