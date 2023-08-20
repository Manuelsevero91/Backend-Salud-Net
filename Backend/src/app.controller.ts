import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
@Controller('medicos')
export class MedicosController {
  @Get()
    getMedicos(@Res() res: Response ){
      //dirname: donde estoy parada
      const dres = join (__dirname, '../data/medicos.json')
      res.sendFile(dres)
    }
}