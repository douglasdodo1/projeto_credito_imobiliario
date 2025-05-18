// clienteInput.dto.ts
export interface ClienteInputDto {
  cpf: string;
  tipo: string;
  nome: string;
  idade: number;
  renda: number;
  Telefones: { numero: string }[];
}

// clienteOutput.dto.ts
export interface ClienteOutputDto {
  tipo: string;
  nome: string;
  idade: number;
  renda: number;
  Telefones?: { numero: string }[];
}
