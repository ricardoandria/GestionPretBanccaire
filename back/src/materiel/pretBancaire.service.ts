import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PretBancaire } from './types';
import { PretBancaireDto } from './dto';

@Injectable()
export class pretBancaireService {
  constructor(private prisma: PrismaService) {}

  async getpretBancaireById(id: number): Promise<PretBancaire | null> {
    const pretBancaire = await this.prisma.pretBancaire.findUnique({
      where: {
        id,
      },
    });

    if (!pretBancaire) {
      throw new ForbiddenException('this pretBancaire does not exist');
    }

    return pretBancaire;
  }

  async getpretBancaires(): Promise<PretBancaire[]> {
    const pretBancaire = await this.prisma.pretBancaire.findMany();

    if (pretBancaire.length == 0) {
      throw new ForbiddenException('no pretBancaire found');
    }

    return pretBancaire;
  }

  async createpretBancaire(dto: PretBancaireDto): Promise<PretBancaire> {
    return this.prisma.pretBancaire.create({
      data: {
        nomClient: dto.nomClient,
        nomBanque: dto.nomBanque,
        montant: Number(dto.montant),
        tauxPret: Number(dto.tauxPret),
      },
    });
  }

  async updatepretBancaire(
    id: number,
    dto: PretBancaireDto,
  ): Promise<PretBancaire> {
    const pretBancaire = await this.prisma.pretBancaire.findUnique({
      where: {
        id,
      },
    });

    if (!pretBancaire) {
      throw new ForbiddenException('this pretBancaire does not exist');
    }

    return this.prisma.pretBancaire.update({
      data: {
        nomClient: dto.nomClient,
        nomBanque: dto.nomBanque,
        montant: Number(dto.montant),
        tauxPret: Number(dto.tauxPret),
      },
      where: {
        id,
      },
    });
  }

  async deletepretBancaire(id: number): Promise<PretBancaire> {
    return this.prisma.pretBancaire.delete({
      where: {
        id,
      },
    });
  }
}
