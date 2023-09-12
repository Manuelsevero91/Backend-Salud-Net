import { Injectable } from '@nestjs/common';
import { PatientI } from './patients.interface';
import { PatientDto } from './patients.dto';

const { v4: uuidv4 } = require('uuid');
const url = 'http://localhost:3030/patients/';
@Injectable()
export class PatientsService {
  async getPatients(): Promise<PatientI[]> {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      throw error;
    }
  }

  async getPatientById(id: string): Promise<PatientI> {
    try{
    const res = await fetch(url + id);
    if (res.status === 404) {
      throw new Error();
    }
    return await res.json();
  }catch (error) {
    throw error;
  }
  }
  
  private async patId(): Promise<number> {
    try {
      const id = uuidv4().slice(0, 6);
      return id;
    } catch (error) {
      throw error;
    }
  }

  async createPatient(patients: PatientI) {
    try {
      const id = await this.patId();
      const newPatient = { ...patients, id };
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
    
      return newPatient;
    } catch (error) {
      throw error;
    }
  }

  async deletePatientById(id: string): Promise<PatientI> {
    const res = await fetch(url + id, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error();
    }
   
    return await res.json();
  }

  async updatePatientById(id: string, body: PatientI): Promise<PatientDto> {
    try {
       await this.getPatientById(id);
      const upPatient = { ...body, id };
      await fetch(url + id, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(upPatient),
      });
      
      return upPatient;
    } catch (error) {
      throw error;
    }
  }
}