import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PretBancaireModule } from './materiel/pretBancaire.module';

@Module({
  imports: [PretBancaireModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
