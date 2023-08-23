import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
    constructor (private readonly patientsServices: PatientsService){}
    @Get()
    getDoctors(): any {
        return this.patientsServices.getPatients();
    }
}
