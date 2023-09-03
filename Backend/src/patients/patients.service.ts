import { Injectable } from '@nestjs/common';
import { PatientI } from './patients.interface';

const { v4: uuidv4 } = require('uuid');
const url = 'http://localhost:3030/patients/';
@Injectable()
export class PatientsService {
  async getPatients(): Promise<PatientI[]> {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      throw new Error("error getting the list of patients")
    }
  }

  async getPatientById(id: number): Promise<PatientI> {
    try {
      const res = await fetch(url + id);
      return await res.json();
    } catch (error) {
      throw new Error('error getting the patient');
    }
  }
  private async patId(): Promise<number> {
    try {
      const id = uuidv4().slice(0, 6);
      return id;
    } catch (error) {
      throw new Error('error creating id');
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
      const dataPatient = {
        message: 'The patient was created',
        data: {
          name: newPatient.name,
          phone: newPatient.phone,
          healthCoverage: newPatient.healthCoverage,
          dni: newPatient.dni,
        },
      };
      return dataPatient;
    } catch (error) {
      throw new Error('the patient was not created');
    }
  }

  async deletePatientById(id: number): Promise<any> {

    const res = await fetch(url + id, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete Patient');
    }

    const parsed = await res.json();
    return parsed;

  }

  async updatePatientById(id: number, body: PatientI): Promise<PatientI> {
    try {
      const isPatient = await this.getPatientById(id);
      if (!Object.keys(isPatient).length) return;
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
      throw new Error('the patient was not up dated');
    }
  }

}