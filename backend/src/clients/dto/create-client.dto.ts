export class CreateClientDto {
  name: string;
  phone?: string;
  email?: string;
  cpf?: string;
  address?: string;
  notes?: string;

  userId: string; // <--- Novo campo obrigatório (ID do Dono)
}
