import {
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class LoginDto {
  
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
