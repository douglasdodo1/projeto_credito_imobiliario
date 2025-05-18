import prisma from "../creditoImobiliarioDB";
import { Prisma, Telefone } from "../../generated/prisma";
import { ClienteInputDto, ClienteOutputDto } from "../dtos/cliente.dto";
import { TelefoneDto } from "../dtos/telefone.dto";

export class ClienteRepository {
  async criarCliente(cliente: ClienteInputDto): Promise<ClienteOutputDto> {
    await prisma.cliente.create({
      data: {
        cpf: cliente.cpf,
        tipo: cliente.tipo,
        nome: cliente.nome,
        idade: cliente.idade,
        renda: cliente.renda,
        Telefones: {
          create: cliente.Telefones?.map((telefone) => ({
            numero: telefone.numero,
          })),
        },
      },
    });

    const telefones = await prisma.telefone.findMany({
      where: { cpf: cliente.cpf },
    });

    return {
      tipo: cliente.tipo,
      nome: cliente.nome,
      idade: cliente.idade,
      renda: cliente.renda,
      Telefones: telefones.map((t) => ({ numero: t.numero })),
    };
  }

  async buscarPorCpf(cpf: string): Promise<ClienteOutputDto | null> {
    const cliente: ClienteOutputDto | null = await prisma.cliente.findUnique({
      where: { cpf: cpf },
      include: {
        Telefones: true,
      },
    });
    if (!cliente) {
      throw new Error("Cliente não foi encontrado");
    }
    return cliente;
  }

  async buscarClientes(where?: Prisma.ClienteWhereInput): Promise<ClienteOutputDto[]> {
    const listaClientes: ClienteOutputDto[] = await prisma.cliente.findMany({
      select: {
        cpf: true,
        tipo: true,
        nome: true,
        idade: true,
        renda: true,
        Telefones: {
          select: {
            numero: true,
          },
        },
      },
      where: where,
    });

    return listaClientes;
  }

  async atualizarCliente(cpf: string, alteracoesCliente: ClienteInputDto): Promise<ClienteOutputDto> {
    const { Telefones, ...dadosCliente } = alteracoesCliente;

    const clienteAtualizado = await prisma.cliente.update({
      where: { cpf },
      data: dadosCliente,
      include: {
        Telefones: true,
      },
    });

    return clienteAtualizado;
  }
}
