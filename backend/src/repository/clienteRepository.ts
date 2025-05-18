import prisma from "../creditoImobiliarioDB";
import { clienteDto } from "../dtos/cliente.dto";
import { Prisma } from "../../generated/prisma";

export class ClienteRepository {
  async criarCliente(cliente: clienteDto): Promise<clienteDto> {
    if (!cliente.cpf) {
      throw new Error("CPF é obrigatório.");
    }
    if (!cliente.nome) {
      throw new Error("nome é obrigatório");
    }
    if (!cliente.idade) {
      throw new Error("idade é obrigatória");
    }
    if (!cliente.renda) {
      throw new Error("renda é obrigatória");
    }

    await prisma.cliente.create({
      data: {
        cpf: cliente.cpf,
        tipo: cliente.tipo ?? "",
        nome: cliente.nome,
        idade: cliente.idade,
        renda: cliente.renda,
        Telefones: {
          create: cliente.Telefones?.map((telefone) => ({
            numero: telefone?.numero,
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

  async buscarPorCpf(cpf: string): Promise<clienteDto | null> {
    const cliente: clienteDto | null = await prisma.cliente.findUnique({
      where: { cpf: cpf },
      include: {
        Telefones: true,
      },
    });
    return cliente;
  }

  async buscarClientes(where?: Prisma.ClienteWhereInput): Promise<clienteDto[]> {
    const listaClientes: clienteDto[] = await prisma.cliente.findMany({
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

  async atualizarCliente(cpf: string, alteracoesCliente: clienteDto): Promise<clienteDto> {
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
