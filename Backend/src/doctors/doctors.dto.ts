import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsNotEmpty,
  } from 'class-validator';
  import { Expose } from 'class-transformer';
  export class DoctorsDto {
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;
  
    @IsEmail()
    @Expose()
    @IsNotEmpty()
    mail: string;
  
    @IsString()
    @Expose()
    @IsNotEmpty()
    speciality: string;
  
    @IsString()
    @Expose()
    @IsNotEmpty()
    license: string;
  
    @IsString()
    @Expose()
    @MaxLength(10)
    @MinLength(5)
    @IsNotEmpty()
    password: string;
  }
  