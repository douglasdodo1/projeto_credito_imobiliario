import { LinhaFinanceamentoDto } from "../dtos/linhaFinanceamento.dto";
import { LinhaFinanceamentoRepository } from "../repository/linhaFinanceamentoRepository";
import { LinhaFinanceamentoValidator } from "../validations/linhaFinanceamentoValidator";

export class LinhaFinanceamentoService {
  linhaFinanceamentoRepository: LinhaFinanceamentoRepository = new LinhaFinanceamentoRepository();
  linhaFinanceamentoValidator: LinhaFinanceamentoValidator = new LinhaFinanceamentoValidator(true);

  async criar(linhaFinanceamento: Required<LinhaFinanceamentoDto>): Promise<LinhaFinanceamentoDto> {
    await this.linhaFinanceamentoValidator.verificarLinhaFinanceamentoValido(linhaFinanceamento);
    const linhaFinanceamentoCriada: LinhaFinanceamentoDto = await this.linhaFinanceamentoRepository.criar(
      linhaFinanceamento
    );
    return linhaFinanceamentoCriada;
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
