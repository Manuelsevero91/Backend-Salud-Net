import { Injectable } from '@nestjs/common';
const { v4: uuidv4 } = require('uuid');
import { DoctorsDto } from './doctors.dto';
import { DoctorsDtoSnPass } from './doctorsSnPass.dto';

const url = 'http://localhost:3030/doctors/';
@Injectable()
export class DoctorsService {
  async getDoctors(): Promise<DoctorsDto[]> {
    try {
      const res = await fetch(url);
      const doctors = await res.json();

      const dataDoctors = doctors.map((doctor) => ({
        name: doctor.name,
        mail: doctor.mail,
        speciality: doctor.speciality,
        license: doctor.license,
        id: doctor.id,
      }));
      return dataDoctors;
    } catch (error) {
      throw error;
    }
  }
  async getDoctorById(id: string): Promise<DoctorsDtoSnPass> {
    try {
      const res = await fetch(url + id);

      if (res.status === 404) {
        throw new Error();
      }
      const parsed = await res.json();
      const respData = {
        name: parsed.name,
        mail: parsed.mail,
        speciality: parsed.speciality,
        license: parsed.license,
      };
      return respData;
    } catch (error) {
      throw error;
    }
  }

  private async medId(): Promise<number> {
   try {
    const id = uuidv4().slice(0, 6);
     return id;
  } catch (error) {
  throw error;
   }
}
  async createDoctor(doctors: DoctorsDto) {
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
        id: newDoctor.id,
      };

      return respData;
    } catch (error) {
      throw error;
    }
  }
  async deleteDoctorById(id: string): Promise<DoctorsDto> {
    try {
      const res = await fetch(url + id, {
        method: 'DELETE',
      });
      if (!res.ok) {
      throw new Error();
        }
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
  async updateDoctorById(
    id: string,
    body: DoctorsDtoSnPass,
  ): Promise<DoctorsDtoSnPass> {
    try {
      await this.getDoctorById(id);
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
        throw new Error();
      }
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
}
