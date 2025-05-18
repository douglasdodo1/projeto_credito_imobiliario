import { ModalidadeCreditoDto } from "../dtos/modalidadeCredito.dto";
import { ModalidadeCreditoRepository } from "../repository/modalidadeCreditoRepository";
import { ModalidadeCreditoValidator } from "../validations/modalidadeCreditoValidator";

export class ModalidadeCreditoService {
  private modalidadeCreditoRepository: ModalidadeCreditoRepository = new ModalidadeCreditoRepository();
  private modalidadeCreditoValidator: ModalidadeCreditoValidator = new ModalidadeCreditoValidator(true);

  async criar(modalidadeCredito: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    await this.modalidadeCreditoValidator.verificarModalidadeCreditoValida(modalidadeCredito);
    const modalidadeCreditoCriada: ModalidadeCreditoDto = await this.modalidadeCreditoRepository.criar(
      modalidadeCredito
    );
    return modalidadeCreditoCriada;
  }

  async buscarPorId(id: number): Promise<ModalidadeCreditoDto> {
    const modadelidadeCredito: ModalidadeCreditoDto = await this.modalidadeCreditoRepository.buscarPorId(id);
    if (!modadelidadeCredito) {
      throw new Error("modalidade de crédito não encontrada");
    }
    return modadelidadeCredito;
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

    await this.modalidadeCreditoValidator.verificarModalidadeCreditoUpdate(alteracoesModalidade);
    return modalidadeAtualizada;
  }
}
