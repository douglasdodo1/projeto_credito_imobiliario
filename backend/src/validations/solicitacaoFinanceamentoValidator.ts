import { ClienteSaidaDto } from "../dtos/cliente.dto";
import { LinhaFinanceamentoDto } from "../dtos/linhaFinanceamento.dto";
import { ModalidadeCreditoDto } from "../dtos/modalidadeCredito.dto";
import { SolicitacaoFinanceamentoEntradaDto } from "../dtos/solicitacaoFinanceamento.dto";
import { ClienteRepository } from "../repository/clienteRepository";
import { LinhaFinanceamentoRepository } from "../repository/linhaFinanceamentoRepository";
import { ModalidadeCreditoRepository } from "../repository/modalidadeCreditoRepository";

export class SolicitacaoFinanceamentoValidator {
  clienteRepository: ClienteRepository = new ClienteRepository();
  modalidadeCreditoRepository: ModalidadeCreditoRepository = new ModalidadeCreditoRepository();
  linhaFinanceamentoRepository: LinhaFinanceamentoRepository = new LinhaFinanceamentoRepository();

  private isteste: boolean = true;
  private erros: Error[] = [];

  constructor(teste: boolean = false) {
    this.isteste = teste;
  }

  async verificarSolicitacaoValida(solicitacao: SolicitacaoFinanceamentoEntradaDto) {
    this.erros = [];
    if (!this.isteste) {
      const cliente: ClienteSaidaDto | null = await this.clienteRepository.buscarPorCpf(solicitacao.clienteCpf);
      if (!cliente) {
        this.erros.push(new Error("Cliente não encontrado"));
      }

      const modalidadeCredito: ModalidadeCreditoDto | null = await this.modalidadeCreditoRepository.buscarPorId(
        solicitacao.modalidadeCreditoId
      );
      if (!modalidadeCredito) {
        this.erros.push(new Error("Modalidade de crédito não encontrada"));
      } else if (!modalidadeCredito.ativo) {
        this.erros.push(new Error("Modalidade de crédito está inativa"));
      }

      const linhaFinanceamento: LinhaFinanceamentoDto | null = await this.linhaFinanceamentoRepository.buscarPorId(
        solicitacao.linhaFinanceamentoId
      );
      if (!linhaFinanceamento) {
        this.erros.push(new Error("Linha de financiamento não encontrada"));
      } else if (!linhaFinanceamento.ativo) {
        this.erros.push(new Error("Linha de financiamento está inativa"));
      }
    }

    if (this.erros.length > 0) {
      const error = new Error("Erros de validação");
      (error as any).statusCode = 400;
      (error as any).details = this.erros.map((e) => e.message);
      throw error;
    }
  }
}
