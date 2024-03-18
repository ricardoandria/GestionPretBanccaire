import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { pretBancaireService } from './pretBancaire.service';
import { PretBancaireDto } from './dto';
import { PretBancaire } from './types';

@Controller('pretbancaire')
export class PretBancaireController {
  constructor(private readonly pretBancaireService: pretBancaireService) {}

  @Get('/:id')
  async getMaterielById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PretBancaire | null> {
    return await this.pretBancaireService.getpretBancaireById(id);
  }

  @Get()
  async getMateriel(): Promise<PretBancaire[]> {
    return await this.pretBancaireService.getpretBancaires();
  }

  @Post()
  async createMateriel(@Body() dto: PretBancaireDto): Promise<PretBancaire> {
    return await this.pretBancaireService.createpretBancaire(dto);
  }

  @Put('/:id')
  async updateMateriel(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PretBancaireDto,
  ): Promise<PretBancaire> {
    return this.pretBancaireService.updatepretBancaire(id, dto);
  }

  @Delete('/:id')
  async deleteMateriel(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PretBancaire> {
    return this.pretBancaireService.deletepretBancaire(id);
  }
}
