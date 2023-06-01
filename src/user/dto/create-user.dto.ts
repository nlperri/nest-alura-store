import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailUnique } from '../validator/email.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'name cannot be empty' })
  name: string;

  @IsEmail(undefined, { message: 'invalid email' })
  @EmailUnique({ message: 'email already exists' })
  email: string;

  @MinLength(6, { message: 'password must have at least 6 characters' })
  password: string;
}
