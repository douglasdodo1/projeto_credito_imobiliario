import { ClientEntradaDto, ClienteSaidaDto } from "./cliente.dto";
import { LinhaFinanceamentoDto } from "./linhaFinanceamento.dto";
import { ModalidadeCreditoDto } from "./modalidadeCredito.dto";

export enum StatusSolicitacao {
  APROVADA = "aprovada",
  REPROVADA = "reprovada",
}

export interface SolicitacaoFinanceamentoEntradaDto {
  id: number;
  clienteCpf: string;
  status: StatusSolicitacao;
  modalidadeCreditoId: number;
  linhaFinanceamentoId: number;
}
export interface SolicitacaoFinanceamentoSaidaDto {
  id: number;
  cliente: ClienteSaidaDto;
  status: StatusSolicitacao;
  modalidadeCredito: ModalidadeCreditoDto;
  linhaFinanceamento: LinhaFinanceamentoDto;
}
