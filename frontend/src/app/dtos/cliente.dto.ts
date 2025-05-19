export interface ClientEntradaDto {
  cpf: string;
  tipo: string;
  nome: string;
  idade: number;
  renda: number;
  Telefones?: { numero: string }[];
}

export interface ClienteSaidaDto {
  tipo: string;
  nome: string;
  idade: number;
  renda: number;
  Telefones?: { numero: string }[];
}
