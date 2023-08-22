import { Injectable } from '@nestjs/common';
import { PatientsI } from './patients.interface';

const url = 'http://localhost:3030/patients'
@Injectable()
export class PatientsService {
    async getPatients(): Promise<PatientsI[]> {
        const res = await fetch(url)
        const parsed = await res.json()
        return parsed
    }
}
