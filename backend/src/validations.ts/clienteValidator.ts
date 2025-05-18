import { ClientEntradaDto } from "../dtos/cliente.dto";

export class ClienteValidator {
  private isteste: boolean = true;
  private erros: Error[] = [];

  constructor(teste: boolean = false) {
    this.isteste = teste;
  }

  async verificarClienteValido(cliente: Partial<ClientEntradaDto>) {
    this.erros = [];

    const camposFaltando = this.verificarCamposObrigatorios(cliente);
    for (const campo of camposFaltando) {
      this.erros.push(new Error(`Campo obrigatório ausente: '${campo}'`));
    }

    if (this.erros.length === 0 && !this.isteste) {
      if (!(await this.verificarCpfValido(cliente.cpf!))) {
        this.erros.push(new Error(`CPF inválido: '${cliente.cpf}'`));
      }

      if (!(await this.validarTipo(cliente.tipo!))) {
        this.erros.push(new Error(`Tipo inválido: '${cliente.tipo}'. Esperado: 'cliente' ou 'adm'`));
      }

      if (!cliente.nome || cliente.nome.trim().length <= 2) {
        this.erros.push(new Error(`Nome inválido: '${cliente.nome}'. Deve conter mais de 2 caracteres`));
      }
    }

    if (
      cliente.Telefones &&
      Array.isArray(cliente.Telefones) &&
      cliente.Telefones.some((t) => !/^\d{11}$/.test(t.numero))
    ) {
      this.erros.push(new Error("Todos os telefones devem conter exatamente 11 dígitos numéricos"));
    }

    if (this.erros.length > 0) {
      const mensagem = this.erros.map((e) => e.message).join(" | ");
      throw new Error(`Erros de validação: ${mensagem}`);
    }
  }

  private verificarCamposObrigatorios(cliente: Partial<ClientEntradaDto>): string[] {
    const camposFaltando: string[] = [];

    if (!cliente.cpf) camposFaltando.push("cpf");
    if (!cliente.tipo) camposFaltando.push("tipo");
    if (!cliente.nome) camposFaltando.push("nome");
    if (cliente.idade === undefined || cliente.idade === null) camposFaltando.push("idade");
    if (cliente.renda === undefined || cliente.renda === null) camposFaltando.push("renda");
    if (!cliente.Telefones || !Array.isArray(cliente.Telefones) || cliente.Telefones.length === 0) {
      camposFaltando.push("Telefones");
    }

    return camposFaltando;
  }

  async verificarCpfValido(cpf: string): Promise<boolean> {
    if (this.isteste) return true;

    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calcularDigito = (cpfParcial: string): number => {
      const soma = cpfParcial
        .split("")
        .map((num, i) => parseInt(num) * (cpfParcial.length + 1 - i))
        .reduce((acc, val) => acc + val, 0);

      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const digito1 = calcularDigito(cpf.slice(0, 9));
    const digito2 = calcularDigito(cpf.slice(0, 9) + digito1);

    return cpf.endsWith(`${digito1}${digito2}`);
  }

  async validarTipo(tipo: string): Promise<boolean> {
    return tipo === "cliente" || tipo === "adm";
  }
}
