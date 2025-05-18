import { ModalidadeCreditoDto } from "../dtos/modalidadeCredito.dto";
import { ModalidadeCreditoRepository } from "../repository/modalidadeCreditoRepository";

export class ModalidadeCreditoService {
  modalidadeCreditoRepository: ModalidadeCreditoRepository = new ModalidadeCreditoRepository();

  async criarModalidadeCredito(modalidadeCredito: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    if (modalidadeCredito == null) {
      throw new Error("modalidade crédito não pode ser vazia");
    }
    if (modalidadeCredito.nome == undefined) {
      throw new Error("nome é obrigatório");
    }
    if (modalidadeCredito.tipoJuros == undefined) {
      throw new Error("nome é obrigatório");
    }
    if (modalidadeCredito.idadeMinima == undefined) {
      throw new Error("nome é obrigatório");
    }
    if (modalidadeCredito.idadeMaxima == undefined) {
      throw new Error("nome é obrigatório");
    }
    if (modalidadeCredito.prazoAnos == undefined) {
      throw new Error("nome é obrigatório");
    }

    const modalidadeCreditoCriada: ModalidadeCreditoDto = await this.modalidadeCreditoRepository.criarModalidadeCredito(
      modalidadeCredito
    );
    return modalidadeCreditoCriada;
  }

  async buscarModalidades(): Promise<ModalidadeCreditoDto[]> {
    const listaModalidadeCredito: ModalidadeCreditoDto[] = await this.modalidadeCreditoRepository.buscarModalidades();
    return listaModalidadeCredito;
  }

  async atualizarModalidade(id: number, alteracoesModalidade: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    const modalidadeAtualizada: ModalidadeCreditoDto = await this.modalidadeCreditoRepository.atualizarModalidade(
      id,
      alteracoesModalidade
    );
    return modalidadeAtualizada;
  }
}
