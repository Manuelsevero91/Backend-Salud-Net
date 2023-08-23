import { Injectable } from '@nestjs/common';
import { DoctorsI } from './doctors.interface';

const url = 'http://localhost:3030/doctors'
@Injectable()
export class DoctorsService {
    async getDoctors(): Promise<DoctorsI[]> {
        const res = await fetch(url)
        const parsed = await res.json()
        return parsed
    }
}