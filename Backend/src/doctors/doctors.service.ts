import { Injectable } from '@nestjs/common';
import { DoctorsI } from './doctors.interface';

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
      const doctors = await this.getDoctors();
      const id = doctors.pop().id + 1; //cambiarlo uuid
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
      return { message: `the doctor created`, data: newDoctor };
    } catch (error) {
      throw new Error('the doctor was not created');
    }
  }
}
