import { LinhaFinanceamentoDto } from "../dtos/linhaFinanceamento.dto";
import { LinhaFinanceamentoRepository } from "../repository/linhaFinanceamentoRepository";

export class LinhaFinanceamentoService {
  linhaFinanceamentoRepository: LinhaFinanceamentoRepository = new LinhaFinanceamentoRepository();

  async criar(linhaFinanceamento: Required<LinhaFinanceamentoDto>): Promise<LinhaFinanceamentoDto> {
    if (linhaFinanceamento == null) {
      throw new Error("linha de financamento está vazia");
    }
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
    if (!alteracoesLinhaFinanceamento) {
      throw new Error("nenhuma alteração detectada");
    }

    const linhaFinanceamentoAtualizada: LinhaFinanceamentoDto = await this.linhaFinanceamentoRepository.atualizar(
      id,
      alteracoesLinhaFinanceamento
    );

    console.log(linhaFinanceamentoAtualizada);
    return linhaFinanceamentoAtualizada;
  }
}
