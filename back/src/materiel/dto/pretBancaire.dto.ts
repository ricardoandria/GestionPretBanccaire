import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PretBancaireDto {
  @IsNotEmpty()
  @IsString()
  nomClient: string;

  @IsNotEmpty()
  @IsString()
  nomBanque: string;

  @IsNotEmpty()
  @IsNumber()
  montant: number;

  @IsNotEmpty()
  @IsNumber()
  tauxPret: number;
}
