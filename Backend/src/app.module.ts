import { Module } from '@nestjs/common';
import { MedicosController } from './app.controller';
@Module({
  imports: [],
  controllers: [MedicosController],
  providers: [],
})
export class AppModule {}