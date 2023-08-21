import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { MedicoController } from './medico/medico.controller';
import { MedicoService } from './medico/medico.service';

@Module({
  imports: [],
  controllers: [AppController, MedicoController],
  providers: [AppService, MedicoService],
})
export class AppModule {}
