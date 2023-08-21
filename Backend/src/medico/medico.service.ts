import { Injectable } from '@nestjs/common';
import { Medico } from './medico.interface';
const URL = 'http://localhost:3030/medicos';

@Injectable()
export class MedicoService {
    async getMedicos(): Promise<Medico[]>{
        const res = await fetch(URL);
        const parsed = await res.json();
        return parsed;
    }
}

