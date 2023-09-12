import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from "class-transformer"

export class PatientDto {
  @Expose()
  @IsNotEmpty() 
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty() 
  @IsString() 
  phone: string;

  @Expose()
  @IsNotEmpty() 
  @IsString()
  healthCoverage: string;

  @Expose()
  @IsNotEmpty() 
  @IsString()
  dni: string;

  
}