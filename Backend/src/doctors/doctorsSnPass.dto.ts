import {
  IsString,
  IsEmail,
  IsNotEmpty
} from 'class-validator';
import { Expose } from 'class-transformer';
export class DoctorsDtoSnPass {
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
}
