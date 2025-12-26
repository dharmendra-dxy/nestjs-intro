import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name needs to be string' })
  @MinLength(3, { message: 'Name should be longth than 3 chars' })
  @MaxLength(50, { message: 'Name should not be longer than 50 chars' })
  name: string;

  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password should be longth than 6 chars' })
  password: string;
}
