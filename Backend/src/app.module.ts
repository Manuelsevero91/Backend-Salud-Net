import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors/doctors.controller';
import { DoctorsService } from './doctors/doctors.service';
@Module({
  imports: [],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class AppModule {}