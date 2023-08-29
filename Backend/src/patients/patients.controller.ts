import { Controller, Get, Param, Body, Post} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientI } from './patients.interface';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}
  @Get()
  getPatients(): any {
    return this.patientsService.getPatients();
  }
  @Get(':id')
  getPatientById(@Param('id') id: number): any {
    return this.patientsService.getPatientById(id);
  }

  @Post()
  createPatient(@Body() body): Promise<any> {
    return this.patientsService.createPatient(body);
  }
}
