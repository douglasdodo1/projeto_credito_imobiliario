import { ModalidadeCreditoDto } from "../dtos/modalidadeCredito.dto";
import prisma from "../creditoImobiliarioDB";

export class ModalidadeCreditoRepository {
  async criarModalidadeCredito(modalidadeCredito: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    const modalidadeCreditoCriada = await prisma.modalidadeCredito.create({
      data: {
        nome: modalidadeCredito.nome!,
        tipoJuros: modalidadeCredito.tipoJuros,
        taxaJuros: modalidadeCredito.taxaJuros,
        taxaAdministracao: modalidadeCredito.taxaAdministracao,
        idadeMinima: modalidadeCredito.idadeMinima!,
        idadeMaxima: modalidadeCredito.idadeMaxima!,
        rendaMinima: modalidadeCredito.rendaMinima,
        rendaMaxima: modalidadeCredito.rendaMaxima,
        prazoAnos: modalidadeCredito.prazoAnos!,
        solicitacoesCredito: {},
      },
    });

    const result: ModalidadeCreditoDto = {
      ...modalidadeCreditoCriada,
      rendaMinima: modalidadeCreditoCriada.rendaMinima ? Number(modalidadeCreditoCriada.rendaMinima) : null,
      rendaMaxima: modalidadeCreditoCriada.rendaMaxima ? Number(modalidadeCreditoCriada.rendaMaxima) : null,
    };

    return result;
  }

  async buscarModalidades(): Promise<ModalidadeCreditoDto[]> {
    const listaModalidadesCredito = await prisma.modalidadeCredito.findMany();
    const resultado: ModalidadeCreditoDto[] = listaModalidadesCredito.map((modalidade) => ({
      ...modalidade,
      rendaMinima: modalidade.rendaMinima ? Number(modalidade.rendaMinima) : null,
      rendaMaxima: modalidade.rendaMaxima ? Number(modalidade.rendaMaxima) : null,
    }));
    return resultado;
  }

  async atualizarModalidade(id: number, alteracoesModalidade: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    const modalidadeAtualizada = await prisma.modalidadeCredito.update({
      where: { id: id },
      data: {
        nome: alteracoesModalidade.nome,
        tipoJuros: alteracoesModalidade.tipoJuros,
        taxaJuros: alteracoesModalidade.taxaJuros,
        taxaAdministracao: alteracoesModalidade.taxaAdministracao,
        idadeMinima: alteracoesModalidade.idadeMinima ?? undefined,
        idadeMaxima: alteracoesModalidade.idadeMaxima ?? undefined,
        rendaMinima: alteracoesModalidade.rendaMinima,
        rendaMaxima: alteracoesModalidade.rendaMaxima,
        prazoAnos: alteracoesModalidade.rendaMaxima ?? undefined,
      },
    });

    const result: ModalidadeCreditoDto = {
      ...modalidadeAtualizada,
      rendaMinima: modalidadeAtualizada.rendaMinima ? Number(modalidadeAtualizada.rendaMinima) : null,
      rendaMaxima: modalidadeAtualizada.rendaMaxima ? Number(modalidadeAtualizada.rendaMaxima) : null,
    };
    return result;
  }

  async atualizarEstado(id: number, novoEstado: boolean): Promise<ModalidadeCreditoDto> {
    console.log(novoEstado);
    const modalidadeAtualizada = await prisma.modalidadeCredito.update({
      where: { id: id },
      data: { ativo: novoEstado },
    });
    return {
      ...modalidadeAtualizada,
      rendaMinima: modalidadeAtualizada.rendaMinima ? Number(modalidadeAtualizada.rendaMinima) : null,
      rendaMaxima: modalidadeAtualizada.rendaMaxima ? Number(modalidadeAtualizada.rendaMaxima) : null,
    };
  }
}
