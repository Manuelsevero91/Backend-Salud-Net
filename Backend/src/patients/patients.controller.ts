import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientI } from './patients.interface';
import { Response } from 'express';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }
  @Get()
  async getPatients(@Res() res: Response): Promise<Response<PatientI[]>> {
    try {
      const patResp = await this.patientsService.getPatients();
      return res.status(HttpStatus.OK).json(patResp);
    } catch (error) {
      throw new NotFoundException('Data not found');
    }
  }

  @Get(':id')
  async getPatientById(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<Response<PatientI>> {
    try {
      const patResp = await this.patientsService.getPatientById(id);
      if (Object.keys(patResp).length) {
        return res.status(HttpStatus.OK).json(patResp);
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: `Patient with'${id}' does not exists` });
      }
    } catch (error) {
      throw new BadRequestException('Data not found');
    }
  }

  @Post()
  async createPatient(
    @Body() body,
    @Res() res: Response,
  ): Promise<Response<PatientI>> {
    try {
      const newPatient = await this.patientsService.createPatient(body);
      return res.status(HttpStatus.CREATED).json({ newPatient });
    } catch (error) {
      throw new BadRequestException('Patient was not created');
    }
  }

  @Delete(':id')
  async deletePatientById(@Param('id') id: number, @Res() res: Response): Promise<any> {
    try {
      const result = await this.patientsService.deletePatientById(id);
      if (result) {
        return res.status(HttpStatus.OK).send({message: 'the patient was deleted'});
      }
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Delete failed' });
      }
    }
  


  @Put(':id')
  async updatePatientById(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() body,
  ): Promise<Response<PatientI>> {
    try {
      const updatedPatient = await this.patientsService.updatePatientById(
        id,
        body,
      );
      if (Object.keys(updatedPatient).length) {
        return res
          .status(HttpStatus.OK)
          .json({ 'Patient updated': updatedPatient });
      }
    } catch (error) {
      throw new BadRequestException(`Patient with'${id}' was not found`);
    }
  }

}