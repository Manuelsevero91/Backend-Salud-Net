import { Injectable, HttpStatus } from '@nestjs/common';
const { v4: uuidv4 } = require('uuid');
import { DoctorsDto } from './doctors.dto';
import { DoctorsDtoSnPass } from './doctorsSnPass.dto';


const url = 'http://localhost:3030/doctors/';
@Injectable()
export class DoctorsService {
  async getDoctors(): Promise<DoctorsDto[]> {
    try {
      const res = await fetch(url);
      const doctors= await res.json();
      
      const dataDoctors= doctors.map(doctor=>({
        name: doctor.name,
        mail: doctor.mail,
        speciality: doctor.speciality,
        license: doctor.license,
        id: doctor.id
      }));
      return dataDoctors
    } catch (error) {  
     throw new Error('error getting the list of doctors');
   }
  }

  async getDoctorById(id: string): Promise<any> {
    const res = await fetch(url + id);
  
    if (res.status === 404) {
      throw new Error(`Doctor with ID ${id} not found`);
    }
  
    const parsed = await res.json();
    const respData = {
      message: 'The doctor found has this data',
      data: {
        name: parsed.name,
        mail: parsed.mail,
        speciality: parsed.speciality,
        license: parsed.license,
      },
      statusCode: HttpStatus.OK
    };
    return respData;
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
          license: newDoctor.license,
          name: newDoctor.name,
          speciality: newDoctor.speciality,
          mail: newDoctor.mail,
          id: newDoctor.id
        }
    
      return  respData;
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
      return { message: `The doctor was deleted with id ${id}`, statusCode: HttpStatus.OK  };
    } catch (error) {
      throw new Error('error deleting doctor');
    }
  }
  async updateDoctorById(id: string, body: DoctorsDtoSnPass ): Promise<DoctorsDtoSnPass | null> {
    try {
      const isDoctor = await this.getDoctorById(id);
      if (!Object.keys(isDoctor).length) {
        return null; 
      }
  
      const upDoctor = { message: 'The doctor was updated',
      data: {
        name: body.name,
        mail: body.mail,
        speciality: body.speciality,
        license: body.license
     } };
  
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
      const updatedData: DoctorsDtoSnPass = await res.json();
      return updatedData ;
    } catch (error) {
      throw new Error('Error updating the doctor');
    }
  }
  }

