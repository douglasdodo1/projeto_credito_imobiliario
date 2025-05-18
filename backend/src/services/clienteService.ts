import { Cliente, Prisma } from "../../generated/prisma";
import { ClienteInputDto, ClienteOutputDto } from "../dtos/cliente.dto";
import { FiltroClienteDto } from "../dtos/filtroCliente.dto";
import { ClienteRepository } from "../repository/clienteRepository";

export class ClienteService {
  clienteRepository: ClienteRepository = new ClienteRepository();

  async criarCliente(cliente: ClienteInputDto): Promise<ClienteOutputDto> {
    if (cliente == null) {
      throw new Error("Cliente não pode ser nulo.");
    }
    const clienteCriado: ClienteOutputDto = await this.clienteRepository.criarCliente(cliente);
    return clienteCriado;
  }

  async buscarPorCpf(cpf: string): Promise<ClienteOutputDto> {
    const cliente: ClienteOutputDto | null = await this.clienteRepository.buscarPorCpf(cpf);

    if (cliente == null) {
      throw new Error("Cliente não encontrado");
    }

    return cliente;
  }

  async buscarClientes(filtros?: FiltroClienteDto): Promise<ClienteOutputDto[]> {
    const where: Prisma.ClienteWhereInput = {};
    if (filtros) {
      if (filtros.idadeMin !== undefined || filtros.idadeMax !== undefined) {
        where.idade = {
          ...(filtros.idadeMin !== undefined ? { gte: filtros.idadeMin } : {}),
          ...(filtros.idadeMax !== undefined ? { lte: filtros.idadeMax } : {}),
        };
        if (filtros.rendaMin !== undefined || filtros.rendaMax !== undefined) {
          where.renda = {
            ...(filtros.rendaMin !== undefined ? { gte: filtros.rendaMin } : {}),
            ...(filtros.rendaMax !== undefined ? { gte: filtros.rendaMax } : {}),
          };
        }
      }
    }
    const listaClientes: ClienteOutputDto[] = await this.clienteRepository.buscarClientes(where);
    return listaClientes;
  }

  async atualizarCliente(cpf: string, alteracoesCliente: ClienteInputDto): Promise<ClienteOutputDto> {
    const clienteAtualizado: ClienteOutputDto = await this.clienteRepository.atualizarCliente(cpf, alteracoesCliente);

    console.log(clienteAtualizado);
    return clienteAtualizado;
  }
}
