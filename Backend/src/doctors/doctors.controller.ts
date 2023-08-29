import { Controller, Get , Post , Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
    constructor (private readonly doctorsServices: DoctorsService){}
    @Get()
    getDoctors(): any {
       
        return this.doctorsServices.getDoctors();
    }
    @Get(':id')
    getDoctorById(@Param('id') id: number):any {
      return this.doctorsServices.getDoctorById(id);
    }  
    @Post()
  createDoctor(@Body() body): Promise<any> {
    return this.doctorsServices.createDoctor(body);
  }
 }