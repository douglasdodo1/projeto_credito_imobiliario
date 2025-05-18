import {
  SolicitacaoFinanceamentoEntradaDto,
  SolicitacaoFinanceamentoSaidaDto,
  StatusSolicitacao,
} from "../dtos/solicitacaoFinanceamento.dto";
import prisma from "../creditoImobiliarioDB";
import { SolicitacaoCredito } from "../../generated/prisma";

export class SolicitacaoFinanceamentoRepository {
  async criar(solicitacao: SolicitacaoFinanceamentoEntradaDto): Promise<SolicitacaoFinanceamentoSaidaDto> {
    const novaSolicitacao = await prisma.solicitacaoCredito.create({
      data: {
        clienteCpf: solicitacao.clienteCpf,
        modalidadeCreditoId: solicitacao.modalidadeCreditoId,
        linhaFinanceamentoId: solicitacao.linhaFinanceamentoId,
        status: solicitacao.status,
      },
      include: {
        cliente: true,
        modalidadeCredito: true,
        linhaFinanceamento: true,
      },
    });

    return {
      id: novaSolicitacao.id,
      status: novaSolicitacao.status as StatusSolicitacao,
      cliente: {
        nome: novaSolicitacao.cliente.nome,
        idade: novaSolicitacao.cliente.idade,
        renda: novaSolicitacao.cliente.renda,
        tipo: novaSolicitacao.cliente.tipo,
      },
      modalidadeCredito: {
        id: novaSolicitacao.modalidadeCredito.id,
        nome: novaSolicitacao.modalidadeCredito.nome,
        ativo: novaSolicitacao.modalidadeCredito.ativo,
        tipoJuros: novaSolicitacao.modalidadeCredito.tipoJuros,
        taxaJuros: novaSolicitacao.modalidadeCredito.taxaJuros,
        taxaAdministracao: novaSolicitacao.modalidadeCredito.taxaAdministracao,
        idadeMinima: novaSolicitacao.modalidadeCredito.idadeMinima,
        idadeMaxima: novaSolicitacao.modalidadeCredito.idadeMaxima,
        rendaMinima: novaSolicitacao.modalidadeCredito.rendaMinima?.toNumber() ?? null,
        rendaMaxima: novaSolicitacao.modalidadeCredito.rendaMaxima?.toNumber() ?? null,
        prazoAnos: novaSolicitacao.modalidadeCredito.prazoAnos,
      },
      linhaFinanceamento: {
        id: novaSolicitacao.linhaFinanceamento.id,
        tipoImovel: novaSolicitacao.linhaFinanceamento.tipoImovel,
        ativo: novaSolicitacao.linhaFinanceamento.ativo,
        criterioElegibilidade: novaSolicitacao.linhaFinanceamento.criterioElegibilidade,
      },
    };
  }

  async buscarTodas(cpf?: string): Promise<SolicitacaoFinanceamentoSaidaDto[]> {
    const listaSolicitacoesFinanceamento = await prisma.solicitacaoCredito.findMany({
      where: cpf
        ? {
            cliente: {
              cpf: cpf,
            },
          }
        : undefined,
      include: {
        cliente: true,
        modalidadeCredito: true,
        linhaFinanceamento: true,
      },
    });

    const listaTratada: SolicitacaoFinanceamentoSaidaDto[] = listaSolicitacoesFinanceamento.map((solicitacao) => ({
      id: solicitacao.id,
      status: solicitacao.status as StatusSolicitacao,
      cliente: {
        nome: solicitacao.cliente.nome,
        idade: solicitacao.cliente.idade,
        renda: solicitacao.cliente.renda,
        tipo: solicitacao.cliente.tipo,
      },
      modalidadeCredito: {
        id: solicitacao.modalidadeCredito.id,
        nome: solicitacao.modalidadeCredito.nome,
        ativo: solicitacao.modalidadeCredito.ativo,
        tipoJuros: solicitacao.modalidadeCredito.tipoJuros,
        taxaJuros: solicitacao.modalidadeCredito.taxaJuros,
        taxaAdministracao: solicitacao.modalidadeCredito.taxaAdministracao,
        idadeMinima: solicitacao.modalidadeCredito.idadeMinima,
        idadeMaxima: solicitacao.modalidadeCredito.idadeMaxima,
        rendaMinima: solicitacao.modalidadeCredito.rendaMinima?.toNumber() ?? null,
        rendaMaxima: solicitacao.modalidadeCredito.rendaMaxima?.toNumber() ?? null,
        prazoAnos: solicitacao.modalidadeCredito.prazoAnos,
      },
      linhaFinanceamento: {
        id: solicitacao.linhaFinanceamento.id,
        tipoImovel: solicitacao.linhaFinanceamento.tipoImovel,
        ativo: solicitacao.linhaFinanceamento.ativo,
        criterioElegibilidade: solicitacao.linhaFinanceamento.criterioElegibilidade,
      },
    }));
    return listaTratada;
  }

  async atualizarEstado(id: number, novoEstado: string): Promise<SolicitacaoFinanceamentoSaidaDto> {
    const solicitacaoAtualizada = await prisma.solicitacaoCredito.update({
      where: { id: id },
      data: { status: novoEstado },
      include: {
        cliente: true,
        modalidadeCredito: true,
        linhaFinanceamento: true,
      },
    });

    return {
      id: solicitacaoAtualizada.id,
      status: solicitacaoAtualizada.status as StatusSolicitacao,
      cliente: {
        nome: solicitacaoAtualizada.cliente.nome,
        idade: solicitacaoAtualizada.cliente.idade,
        renda: solicitacaoAtualizada.cliente.renda,
        tipo: solicitacaoAtualizada.cliente.tipo,
      },
      modalidadeCredito: {
        id: solicitacaoAtualizada.modalidadeCredito.id,
        nome: solicitacaoAtualizada.modalidadeCredito.nome,
        ativo: solicitacaoAtualizada.modalidadeCredito.ativo,
        tipoJuros: solicitacaoAtualizada.modalidadeCredito.tipoJuros,
        taxaJuros: solicitacaoAtualizada.modalidadeCredito.taxaJuros,
        taxaAdministracao: solicitacaoAtualizada.modalidadeCredito.taxaAdministracao,
        idadeMinima: solicitacaoAtualizada.modalidadeCredito.idadeMinima,
        idadeMaxima: solicitacaoAtualizada.modalidadeCredito.idadeMaxima,
        rendaMinima: solicitacaoAtualizada.modalidadeCredito.rendaMinima?.toNumber() ?? null,
        rendaMaxima: solicitacaoAtualizada.modalidadeCredito.rendaMaxima?.toNumber() ?? null,
        prazoAnos: solicitacaoAtualizada.modalidadeCredito.prazoAnos,
      },
      linhaFinanceamento: {
        id: solicitacaoAtualizada.linhaFinanceamento.id,
        tipoImovel: solicitacaoAtualizada.linhaFinanceamento.tipoImovel,
        ativo: solicitacaoAtualizada.linhaFinanceamento.ativo,
        criterioElegibilidade: solicitacaoAtualizada.linhaFinanceamento.criterioElegibilidade,
      },
    };
  }
}
