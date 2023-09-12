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
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientI } from './patients.interface';
import { Response } from 'express';
import { PatientDto } from './patients.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }
  @Get()
  async getPatients(@Res() res: Response): Promise<Response<PatientI[]>> {
    try {
      const patResp = await this.patientsService.getPatients();
      return res
        .status(HttpStatus.OK)
        .send({ message: 'The Patients list', patResp, statusCode: HttpStatus.OK });
    } catch (error) {
      throw new NotFoundException('Data not found');
    }
  }

  @Get(':id')
  async getPatientById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<Response<PatientI>> {
    try {
      const dataPatient = await this.patientsService.getPatientById(id);
      return res.status(HttpStatus.OK).send({ message: 'Patient found', dataPatient, statusCode: HttpStatus.OK });

    } catch (error) {
      throw new NotFoundException(`Patient with'${id}' does not exists`);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPatient(
    @Body() body: PatientDto,
    @Res() res: Response,
  ): Promise<Response<PatientDto>> {
    try {
      const newPatient = await this.patientsService.createPatient(body);
      return res.status(HttpStatus.CREATED).json({ message: `The patient was created `, newPatient, statusCode: HttpStatus.CREATED });
    } catch (error) {
      throw new BadRequestException('Patient was not created');
    }
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deletePatientById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<PatientI>> {
    try {
      const deletePat = await this.patientsService.deletePatientById(id);
      if (deletePat) {
        return res.status(HttpStatus.OK).send({ message: `The patient was deleted with id ${id}`, statusCode: HttpStatus.OK });
      }
    } catch (error) {
      throw new NotFoundException('Deleted Failed');
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePatientById(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: PatientDto,
  ): Promise<Response<PatientDto>> {
    try {
      const updatedPatient = await this.patientsService.updatePatientById(
        id,
        body,
      );
        return res.status(HttpStatus.OK).json(({ message: `The patient was updated `, updatedPatient, statusCode: HttpStatus.OK }));

    } catch (error) {
      throw new BadRequestException(`Patient with'${id}' was not updated`);
    }
  }
}