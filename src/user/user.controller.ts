import {
  Body,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { GetUserDTO } from './dto/get-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const userEntity = new UserEntity();
    (userEntity.email = data.email),
      (userEntity.password = data.password),
      (userEntity.name = data.name),
      (userEntity.id = uuid());

    const user = await this.userService.create(userEntity);
    return {
      user: new GetUserDTO(user.id, user.name),
      message: 'User successfully registered',
    };
  }
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @CacheKey('users')
  @Get()
  async get() {
    const users = await this.userService.get();
    return users;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    const updatedUser = await this.userService.update(id, data);

    return {
      message: 'User successfully updated',
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);

    return {
      message: 'User successfully deleted',
    };
  }
}
