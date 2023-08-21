import { Get, Controller } from '@nestjs/common';
import { MedicoService } from './medico.service';
// import { Medico } from './medico.interface';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}
  @Get()
  getMedicos(): any {
    return this.medicoService.getMedicos();
  }
};
