import { SolicitacaoCredito } from "../../generated/prisma";
import {
  SolicitacaoFinanceamentoEntradaDto,
  SolicitacaoFinanceamentoSaidaDto,
} from "../dtos/solicitacaoFinanceamento.dto";
import { SolicitacaoFinanceamentoRepository } from "../repository/solicitacaoFinanceamentoRepository";
import { SolicitacaoFinanceamentoValidator } from "../validations/solicitacaoFinanceamentoValidator";

export class SolicitacaoFinanceamentoService {
  private solicitacaoFinanceamentoRepository: SolicitacaoFinanceamentoRepository =
    new SolicitacaoFinanceamentoRepository();
  private solicitacaoFinanceamentoValidator: SolicitacaoFinanceamentoValidator =
    new SolicitacaoFinanceamentoValidator();

  async criar(solicitacao: SolicitacaoFinanceamentoEntradaDto): Promise<SolicitacaoFinanceamentoSaidaDto> {
    if (!solicitacao) {
      throw new Error("Solicitação de financiamento não pode ser vazia");
    }

    await this.solicitacaoFinanceamentoValidator.verificarSolicitacaoValida(solicitacao);

    const solicitacaoCriada = await this.solicitacaoFinanceamentoRepository.criar(solicitacao);
    return solicitacaoCriada;
  }

  async buscarTodas(cpf?: string): Promise<SolicitacaoFinanceamentoSaidaDto[]> {
    const lista: SolicitacaoFinanceamentoSaidaDto[] = await this.solicitacaoFinanceamentoRepository.buscarTodas();
    return lista;
  }

  async atualizarEstado(id: number, novoEstado: string): Promise<SolicitacaoFinanceamentoSaidaDto> {
    const solicitacaoAtualizada: SolicitacaoFinanceamentoSaidaDto =
      await this.solicitacaoFinanceamentoRepository.atualizarEstado(id, novoEstado);
    return solicitacaoAtualizada;
  }
}
