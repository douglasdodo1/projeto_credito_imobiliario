import { ModalidadeCreditoDto } from "../dtos/modalidadeCredito.dto";
import { ModalidadeCreditoRepository } from "../repository/modalidadeCreditoRepository";

export class ModalidadeCreditoService {
  modalidadeCreditoRepository: ModalidadeCreditoRepository = new ModalidadeCreditoRepository();

  async criar(modalidadeCredito: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    const modalidadeCreditoCriada: ModalidadeCreditoDto = await this.modalidadeCreditoRepository.criar(
      modalidadeCredito
    );
    return modalidadeCreditoCriada;
  }

  async buscarTodas(): Promise<ModalidadeCreditoDto[]> {
    const listaModalidadeCredito: ModalidadeCreditoDto[] = await this.modalidadeCreditoRepository.buscarTodas();
    return listaModalidadeCredito;
  }

  async atualizar(id: number, alteracoesModalidade: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    const modalidadeAtualizada: ModalidadeCreditoDto = await this.modalidadeCreditoRepository.atualizar(
      id,
      alteracoesModalidade
    );
    return modalidadeAtualizada;
  }
}
