import { Injectable } from '@nestjs/common';
import { PatientI } from './patients.interface';
const url = 'http://localhost:3030/patients/';
@Injectable()
export class PatientsService {
  async getPatients(): Promise<PatientI[]> {
   try {
    const res = await fetch(url);
    return await res.json();
   } catch (error) {
    throw new Error ("error getting the list of patients" )
   }
  }

  async getPatientById(id: number): Promise<PatientI> {
    try {
    const res = await fetch(url + id);
    return await res.json();

    } catch (error) {
        throw new Error ("error getting the patient" )
    }
  }
  private async patId(): Promise<number> {
    try {
      const patients = await this.getPatients();
      const id = patients.pop().id + 1; //cambiar por uuid
      return id;
    }catch (error) {
      throw new Error("error creating id")
    }}

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
          return {message: `the patient created`, data: newPatient}
        }
      catch (error) {
        throw new Error("the patient was not created")
        }
    }
}