import prisma from "../creditoImobiliarioDB";
import { LinhaFinanceamentoDto } from "../dtos/linhaFinanceamento.dto";

export class LinhaFinanceamentoRepository {
  async criar(linhaFinanceamento: Required<LinhaFinanceamentoDto>): Promise<LinhaFinanceamentoDto> {
    const linhaFinanceamentoCriada = await prisma.linhaFinanceamento.create({
      data: {
        tipoImovel: linhaFinanceamento.tipoImovel,
        criterioElegibilidade: linhaFinanceamento.criterioElegibilidade,
      },
    });
    return linhaFinanceamentoCriada;
  }

  async buscarTodas(): Promise<LinhaFinanceamentoDto[]> {
    const listaLinhaFinanceamento: LinhaFinanceamentoDto[] = await prisma.linhaFinanceamento.findMany();
    return listaLinhaFinanceamento;
  }

  async atualizar(id: number, alteracoesLinhaFinanceamento: LinhaFinanceamentoDto): Promise<LinhaFinanceamentoDto> {
    const linhaFinanceamentoAtualizada: LinhaFinanceamentoDto = await prisma.linhaFinanceamento.update({
      where: { id: id },
      data: alteracoesLinhaFinanceamento,
    });

    return linhaFinanceamentoAtualizada;
  }
}
