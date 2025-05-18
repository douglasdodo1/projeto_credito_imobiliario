import { ModalidadeCreditoDto } from "../dtos/modalidadeCredito.dto";
import prisma from "../creditoImobiliarioDB";
import { ModalidadeCredito } from "../../generated/prisma";

export class ModalidadeCreditoRepository {
  async criar(modalidadeCredito: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    const modalidadeCreditoCriada = await prisma.modalidadeCredito.create({
      data: {
        nome: modalidadeCredito.nome,
        tipoJuros: modalidadeCredito.tipoJuros,
        taxaJuros: modalidadeCredito.taxaJuros,
        taxaAdministracao: modalidadeCredito.taxaAdministracao,
        idadeMinima: modalidadeCredito.idadeMinima,
        idadeMaxima: modalidadeCredito.idadeMaxima,
        rendaMinima: modalidadeCredito.rendaMinima,
        rendaMaxima: modalidadeCredito.rendaMaxima,
        prazoAnos: modalidadeCredito.prazoAnos,
      },
    });

    const result: ModalidadeCreditoDto = {
      ...modalidadeCreditoCriada,
      rendaMinima: modalidadeCreditoCriada.rendaMinima ? Number(modalidadeCreditoCriada.rendaMinima) : null,
      rendaMaxima: modalidadeCreditoCriada.rendaMaxima ? Number(modalidadeCreditoCriada.rendaMaxima) : null,
    };

    return result;
  }

  async buscarPorId(id: number): Promise<ModalidadeCreditoDto> {
    const modadelidadeCredito: ModalidadeCredito | null = await prisma.modalidadeCredito.findUnique({
      where: { id: id },
    });

    return modadelidadeCredito as ModalidadeCreditoDto;
  }

  async buscarTodas(): Promise<ModalidadeCreditoDto[]> {
    const listaModalidadesCredito = await prisma.modalidadeCredito.findMany();
    const resultado: ModalidadeCreditoDto[] = listaModalidadesCredito.map((modalidade) => ({
      ...modalidade,
      rendaMinima: modalidade.rendaMinima ? Number(modalidade.rendaMinima) : null,
      rendaMaxima: modalidade.rendaMaxima ? Number(modalidade.rendaMaxima) : null,
    }));
    return resultado;
  }

  async atualizar(id: number, alteracoesModalidade: ModalidadeCreditoDto): Promise<ModalidadeCreditoDto> {
    const modalidadeAtualizada = await prisma.modalidadeCredito.update({
      where: { id: id },
      data: alteracoesModalidade,
    });

    const resultado: ModalidadeCreditoDto = {
      ...modalidadeAtualizada,
      rendaMinima: modalidadeAtualizada.rendaMinima ? Number(modalidadeAtualizada.rendaMinima) : null,
      rendaMaxima: modalidadeAtualizada.rendaMaxima ? Number(modalidadeAtualizada.rendaMaxima) : null,
    };
    return resultado;
  }
}
