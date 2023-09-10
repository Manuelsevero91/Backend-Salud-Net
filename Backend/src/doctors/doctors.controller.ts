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
      const docResp = await this.doctorsServices.getDoctors();
      return res.status(HttpStatus.OK).send(docResp);
    } catch (error) {
      throw new NotFoundException('Doctor list not found');
    }
  }
  @Get(':id')
  async getDoctorById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<any>> {
    try {
      const idDocResp = await this.doctorsServices.getDoctorById(id);
      if (Object.keys(idDocResp).length) {
        return res.status(HttpStatus.OK).send(idDocResp);
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'doctor not found' });
      }
    } catch (error) {
      throw new BadRequestException(`Cannot get doctor with id ${id}`);
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
      return res.status(HttpStatus.CREATED).send(createDoc);
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
  ): Promise<Response<any>> {
    try {
      const updateDoc = await this.doctorsServices.updateDoctorById(id, body);
      return res.status(HttpStatus.OK).send(updateDoc) ;
    } catch (error) {
      throw new BadRequestException(`Doctor with ${id} was not found`);
    }
  }
  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteDoctor(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<DoctorsDto>> {
    try {
      const deleteDoc = await this.doctorsServices.deleteDoctorById(id);
      return res.status(HttpStatus.OK).send(deleteDoc);
    } catch (error) {
      throw new NotFoundException('Delete failed');
    }
  }
}
