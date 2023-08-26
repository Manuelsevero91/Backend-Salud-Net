import { Controller, Get } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
    constructor (private readonly doctorsServices: DoctorsService){}
    @Get()
    getDoctors(): any {
        return this.doctorsServices.getDoctors();
    }
}