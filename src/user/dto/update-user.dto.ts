import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailUnique } from '../validator/email.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'invalid email' })
  @EmailUnique({ message: 'email already exists' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'password must have at least 6 characters' })
  @IsOptional()
  password: string;
}
