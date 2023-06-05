import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { GetUserDTO } from './dto/get-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userEntity: UserEntity) {
    const user = await this.userRepository.save(userEntity);

    return user;
  }

  async get() {
    const users = await this.userRepository.find();
    const usersDatabase = users.map(
      (user) => new GetUserDTO(user.id, user.name),
    );

    return usersDatabase;
  }

  async update(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async delete(id: string) {
    this.userRepository.delete(id);
  }
}
