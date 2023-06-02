import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { GetUserDTO } from './dto/get-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const userEntity = new UserEntity();
    (userEntity.email = data.email),
      (userEntity.password = data.password),
      (userEntity.name = data.name),
      (userEntity.id = uuid());

    this.userRepository.create(userEntity);
    return {
      user: new GetUserDTO(userEntity.id, userEntity.name),
      message: 'User successfully registered',
    };
  }

  @Get()
  async get() {
    const users = await this.userRepository.get();
    const usersOutput = users.map((user) => new GetUserDTO(user.id, user.name));

    return usersOutput;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    const updatedUser = await this.userRepository.update(id, data);

    return {
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
      message: 'User successfully updated',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.userRepository.delete(id);

    return {
      message: 'User successfully deleted',
    };
  }
}
