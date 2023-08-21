import { Injectable } from '@nestjs/common';
import { Doctors } from './doctors.interface';

const url = 'http://localhost:3030/doctors'
@Injectable()
export class DoctorsService {
    async getDoctors(): Promise<Doctors[]> {
        const res = await fetch(url)
        const parsed = await res.json()
        return parsed
    }
}