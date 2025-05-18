import { SolicitacaoCredito } from "../../generated/prisma";
import { TelefoneDto } from "./telefone.dto";

export interface clienteDto {
  cpf?: string;
  tipo?: string;
  nome?: string;
  idade?: number;
  renda?: number;
  Telefones?: TelefoneDto[];
  solicitacoesCreditoId?: number[];
}
