import { Module } from '@nestjs/common';
import { PretBancaireController } from './pretBancaire.controller';
import { pretBancaireService } from './pretBancaire.service';

@Module({
  controllers: [PretBancaireController],
  providers: [pretBancaireService],
})
export class PretBancaireModule {}
