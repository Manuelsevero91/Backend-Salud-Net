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
      throw new Error("error getting the patient")
    }
  }
  private async patId(): Promise<number> {
    try {
      const id = uuidv4().slice(0, 6)
      return id;
    } catch (error) {
      throw new Error("error creating id")
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
        message: 'The doctor was created',
        data: {
          name: newPatient.name,
          phone: newPatient.phone,
          healthCoverage: newPatient.healthCoverage,
          dni: newPatient.dni
        }
      }
      return dataPatient;
    }
    catch (error) {
      throw new Error("the patient was not created")
    }
  }
}