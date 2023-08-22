import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors/doctors.controller';
import { DoctorsService } from './doctors/doctors.service';
import { PatientsController } from './patients/patients.controller';
import { PatientsService } from './patients/patients.service';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
@Module({
  imports: [PatientsModule, DoctorsModule],
  controllers: [DoctorsController, PatientsController],
  providers: [DoctorsService, PatientsService],
})
export class AppModule {}