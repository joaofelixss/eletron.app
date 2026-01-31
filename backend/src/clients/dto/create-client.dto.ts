import { IsString, IsOptional } from 'class-validator';
export class CreateClientDto {
  name: string;
  phone?: string;
  email?: string;
  cpf?: string;
  address?: string;
  notes?: string;

  @IsOptional() // <--- ADICIONE AQUI
  @IsString() // <--- ADICIONE AQUI
  image?: string; // <--- ADICIONE AQUI

  userId: string; // <--- Novo campo obrigatório (ID do Dono)
}
