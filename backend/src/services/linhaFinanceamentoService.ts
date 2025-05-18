import { LinhaFinanceamentoDto } from "../dtos/linhaFinanceamento.dto";
import { LinhaFinanceamentoRepository } from "../repository/linhaFinanceamentoRepository";
import { LinhaFinanceamentoValidator } from "../validations/linhaFinanceamentoValidator";

export class LinhaFinanceamentoService {
  private linhaFinanceamentoRepository: LinhaFinanceamentoRepository = new LinhaFinanceamentoRepository();
  private linhaFinanceamentoValidator: LinhaFinanceamentoValidator = new LinhaFinanceamentoValidator(true);

  async criar(linhaFinanceamento: Required<LinhaFinanceamentoDto>): Promise<LinhaFinanceamentoDto> {
    await this.linhaFinanceamentoValidator.verificarLinhaFinanceamentoValido(linhaFinanceamento);
    const linhaFinanceamentoCriada: LinhaFinanceamentoDto = await this.linhaFinanceamentoRepository.criar(
      linhaFinanceamento
    );
    return linhaFinanceamentoCriada;
  }

  async buscarPorId(id: number): Promise<LinhaFinanceamentoDto> {
    const linhaFinanceamento: LinhaFinanceamentoDto = await this.linhaFinanceamentoRepository.buscarPorId(id);
    if (!linhaFinanceamento) {
      throw new Error("linha de financeamento não encontrada");
    }

    return linhaFinanceamento;
  }

  async buscarTodas(): Promise<LinhaFinanceamentoDto[]> {
    const listaLinhaFinanceamento: LinhaFinanceamentoDto[] = await this.linhaFinanceamentoRepository.buscarTodas();
    return listaLinhaFinanceamento;
  }

  async atualizar(id: number, alteracoesLinhaFinanceamento: LinhaFinanceamentoDto): Promise<LinhaFinanceamentoDto> {
    await this.linhaFinanceamentoValidator.verificarLinhaFinanceamentoUpdate(alteracoesLinhaFinanceamento);
    const linhaFinanceamentoAtualizada: LinhaFinanceamentoDto = await this.linhaFinanceamentoRepository.atualizar(
      id,
      alteracoesLinhaFinanceamento
    );

    console.log(linhaFinanceamentoAtualizada);
    return linhaFinanceamentoAtualizada;
  }
}
