import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Delete,
  Put,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Response } from 'express';
import { DoctorsDto } from './doctors.dto';
import { DoctorsDtoSnPass } from './doctorsSnPass.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsServices: DoctorsService) {}
  @Get()
  async getDoctors(@Res() res: Response): Promise<Response<DoctorsDto[]>> {
    try {
      const doctorsList = await this.doctorsServices.getDoctors();
      return res.status(HttpStatus.OK).send({message: "The Doctor list",data: doctorsList, statusCode: HttpStatus.OK });
    } catch (error) {
      throw new NotFoundException('Doctor list not found');
    }
  }
  @Get(':id')
  async getDoctorById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<DoctorsDto>> {
    try {
      const idDocResp = await this.doctorsServices.getDoctorById(id);
        return res.status(HttpStatus.OK).send({message: 'The doctor found has this data',data: idDocResp, statusCode: HttpStatus.OK })
    } catch (error) {
      throw new NotFoundException(`Cannot get doctor with id ${id}`); 
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createDoctor(
    @Body() body:DoctorsDto,
    @Res() res: Response,
  ): Promise<Response<DoctorsDto>> {
    try {
      const createDoc = await this.doctorsServices.createDoctor(body);
      return res.status(HttpStatus.CREATED).send({message: "The doctor was created",data: createDoc, statusCode: HttpStatus.CREATED});
    } catch (error) {
      throw new NotFoundException('The doctor was not created');
    }
  }
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateDoctor(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() body:DoctorsDtoSnPass,
  ): Promise<Response<DoctorsDtoSnPass>> {
    try {
      const updateDoc = await this.doctorsServices.updateDoctorById(id, body);
      return res.status(HttpStatus.OK).send({message:"Doctor updated succesfully", data: updateDoc, statusCode: HttpStatus.OK }) ;
    } catch (error) {
      throw new BadRequestException(`Doctor with ${id} was not updated`);
    }
  }
  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteDoctor(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<DoctorsDto>> {
    try {
      await this.doctorsServices.deleteDoctorById(id);
      return res.status(HttpStatus.OK).send({message: `The doctor was deleted with id ${id}`, statusCode: HttpStatus.OK});
    } catch (error) {
      throw new NotFoundException('Delete failed');
    }
  }
}
