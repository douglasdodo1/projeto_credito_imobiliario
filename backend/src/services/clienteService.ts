import { Prisma } from "../../generated/prisma";
import { ClientEntradaDto, ClienteSaidaDto } from "../dtos/cliente.dto";
import { FiltroClienteDto } from "../dtos/filtroCliente.dto";
import { ClienteRepository } from "../repository/clienteRepository";
import { ClienteValidator } from "../validations/clienteValidator";

export class ClienteService {
  private clienteRepository: ClienteRepository = new ClienteRepository();
  private clienteValidator: ClienteValidator = new ClienteValidator(true);

  async criar(cliente: ClientEntradaDto): Promise<ClienteSaidaDto> {
    await this.clienteValidator.verificarClienteValido(cliente);
    const verificarExistencia: ClienteSaidaDto | null = await this.clienteRepository.buscarPorCpf(cliente.cpf);
    if (verificarExistencia) {
      throw new Error("Usuário já registrado");
    }

    const clienteCriado: ClienteSaidaDto = await this.clienteRepository.criar(cliente);
    return clienteCriado;
  }

  async buscarPorCpf(cpf: string): Promise<ClienteSaidaDto> {
    const cliente: ClienteSaidaDto | null = await this.clienteRepository.buscarPorCpf(cpf);

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return cliente;
  }

  async buscarTodos(filtros?: FiltroClienteDto): Promise<ClienteSaidaDto[]> {
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
    const listaClientes: ClienteSaidaDto[] = await this.clienteRepository.buscarTodos(where);
    return listaClientes;
  }

  async atualizar(cpf: string, alteracoesCliente: ClientEntradaDto): Promise<ClienteSaidaDto> {
    const clienteAtualizado: ClienteSaidaDto = await this.clienteRepository.atualizar(cpf, alteracoesCliente);
    this.clienteValidator.verificarClienteUpdate(alteracoesCliente);
    return clienteAtualizado;
  }
}
