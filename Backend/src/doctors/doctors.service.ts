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

  async getDoctorById(id: number): Promise<DoctorsI> {
    try {
      const res = await fetch(url + id);
      return await res.json();
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
      const parsed = await res.json();
      return { message: `The doctor was deleted with id ${id}` };
    } catch (error) {
      throw new Error('error deleting doctor');
    }
  }
  async updateDoctorById(id: number, body: DoctorsI): Promise<any> {
    try {
      const isMed = await this.getDoctorById(id);
      if (!Object.keys(isMed).length) return;
      const updatedDoctor = { ...body, id };
      await fetch(url + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDoctor),
      });
      const respData = {
        message: 'The doctor was updated',
        data: {
          license: updatedDoctor.license,
          name: updatedDoctor.name,
          speciality: updatedDoctor.speciality,
          mail: updatedDoctor.mail,
        },
      };
      return respData;
    } catch (error) {
      throw new Error('error updating doctor');
    }
  }
}
