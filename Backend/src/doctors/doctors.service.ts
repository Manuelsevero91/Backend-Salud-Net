import { Injectable } from '@nestjs/common';
import { DoctorsI } from './doctors.interface';
const { v4: uuidv4 } = require('uuid');

const url = 'http://localhost:3030/doctors/';
@Injectable()
export class DoctorsService {
  async getDoctors(): Promise<DoctorsI[]> {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      throw new Error('error getting the list of doctors');
    }
  }

  async getDoctorById(id: number): Promise<any> {
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
  async createDoctor(doctors: DoctorsI) {
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
        },
      };
      return respData;
    } catch (error) {
      throw new Error('the doctor was not created');
    }
  }
  async deleteDoctorById(id: number): Promise<any> {
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
  async updateDoctorById(id: number, body: DoctorsI): Promise<DoctorsI | null> {
    try {
      const isDoctor = await this.getDoctorById(id);
      if (!Object.keys(isDoctor).length) {
        return null; 
      }
  
      const upDoctor = { 
        license: body.license,
        name: body.name,
        speciality: body.speciality,
        mail: body.mail,
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
      const updatedData: DoctorsI = await res.json();
      return updatedData;
    } catch (error) {
      throw new Error('Error updating the doctor');
    }
  }
  }

