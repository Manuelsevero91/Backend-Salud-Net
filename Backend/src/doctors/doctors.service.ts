import { Injectable } from '@nestjs/common';
import { DoctorsI } from './doctors.interface';
import { v4 as uuidv4 } from 'uuid';
const url = 'http://localhost:3030/doctors/';
@Injectable()
export class DoctorsService {
  async getDoctors(): Promise<DoctorsI[]> {
    try {
      const res = await fetch(url);
      return await res.json();//map
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
      const id =uuidv4().slice(0, 6)
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
      })
       const respData = {
      message: 'The doctor was created',
      data: {
        license: newDoctor.license,
        name: newDoctor.name, 
        speciality: newDoctor.speciality, 
        mail: newDoctor.mail
      }}
      return respData;
    } catch (error) {
      throw new Error('the doctor was not created');
    }
  }
}
