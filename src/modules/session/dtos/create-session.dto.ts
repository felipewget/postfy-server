import {
  IsString,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
