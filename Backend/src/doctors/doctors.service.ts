import { Injectable } from '@nestjs/common';
const { v4: uuidv4 } = require('uuid');
import { DoctorsDto } from './doctors.dto';
import { DoctorsDtoId } from './doctorsId.dto';

const url = 'http://localhost:3030/doctors/';
@Injectable()
export class DoctorsService {
  async getDoctors(): Promise<DoctorsDtoId[]> {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      throw new Error('error getting the list of doctors');
    }
  }

  async getDoctorById(id: string): Promise<any> {
    try {
      const res = await fetch(url + id);
      const parsed = await res.json();
      const respData = {
        message: 'The doctor found has this data',
        data: {
          name: parsed.name,
          mail: parsed.mail,
          speciality: parsed.speciality,
          license: parsed.license,
        },
      };
      return respData;
    } catch (error) {
      throw new Error('error getting the doctor');
    }
  }

  private async medId(): Promise<number> {
    try {
      const id = uuidv4().slice(0, 6);
      return id;
    } catch (error) {
      throw new Error('error creating id');
    }
  }
  async createDoctor(doctors:DoctorsDto) {
    try {
      const id = await this.medId();
      const newDoctor = { ...doctors, id };
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });
      const respData = {
        message: 'The doctor was created',
        data: {
          license: newDoctor.license,
          name: newDoctor.name,
          speciality: newDoctor.speciality,
          mail: newDoctor.mail,
          id: newDoctor.id
        },
      };
      return respData;
    } catch (error) {
      throw new Error('the doctor was not created');
    }
  }
  async deleteDoctorById(id: string): Promise<any> {
    try {
      const res = await fetch(url + id, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete doctor');
      }
      const parsed = await res.json();
      return { message: `The doctor was deleted with id ${id}` };
    } catch (error) {
      throw new Error('error deleting doctor');
    }
  }
  async updateDoctorById(id: string, body: DoctorsDto ): Promise<DoctorsDto | null> {
    try {
      const isDoctor = await this.getDoctorById(id);
      if (!Object.keys(isDoctor).length) {
        return null; 
      }
  
      const upDoctor = { 
        name: body.name,
        mail: body.mail,
        speciality: body.speciality,
        license: body.license,
      };
  
      const res = await fetch(url + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(upDoctor),
      });
  
      if (!res.ok) {
        throw new Error('Failed to update the doctor');
      }
      const updatedData: DoctorsDto = await res.json();
      return updatedData;
    } catch (error) {
      throw new Error('Error updating the doctor');
    }
  }
  }

