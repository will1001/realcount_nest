import { IsNotEmpty, IsEmail, Length, IsNumberString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  id_kabupaten: string;

  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  id_kabupaten: string;

  @IsNotEmpty()
  password: string;
}
