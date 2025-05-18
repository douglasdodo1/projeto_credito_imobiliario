import { ModalidadeCreditoDto } from "../dtos/modalidadeCredito.dto";

export class ModalidadeCreditoValidator {
  private isteste: boolean = true;
  private erros: Error[] = [];

  constructor(teste: boolean = false) {
    this.isteste = teste;
  }

  async verificarModalidadeCreditoValida(mod: Partial<ModalidadeCreditoDto>) {
    this.erros = [];

    if (!this.isteste) {
      const camposFaltando = this.verificarCamposObrigatorios(mod);
      for (const campo of camposFaltando) {
        this.erros.push(new Error(`Campo obrigatório ausente: '${campo}'`));
      }

      if (this.erros.length === 0) {
        if (!mod.nome || mod.nome.trim().length === 0) {
          this.erros.push(new Error(`Nome inválido: '${mod.nome}'`));
        }

        if (!mod.tipoJuros || !["simples", "composto"].includes(mod.tipoJuros.toLowerCase())) {
          this.erros.push(new Error(`Tipo de juros inválido: '${mod.tipoJuros}'. Esperado: 'simples' ou 'composto'`));
        }

        if (mod.idadeMinima! < 18) {
          this.erros.push(new Error(`Idade mínima inválida: '${mod.idadeMinima}'. Deve ser >= 18`));
        }

        if (mod.idadeMaxima! < mod.idadeMinima!) {
          this.erros.push(
            new Error(`Idade máxima inválida: '${mod.idadeMaxima}'. Deve ser >= idade mínima (${mod.idadeMinima})`)
          );
        }

        if (mod.prazoAnos! <= 0) {
          this.erros.push(new Error(`Prazo em anos inválido: '${mod.prazoAnos}'. Deve ser maior que zero`));
        }
      }

      if (this.erros.length > 0) {
        const error = new Error("Erros de validação");
        (error as any).statusCode = 400;
        (error as any).details = this.erros.map((e) => e.message);
        throw error;
      }
    }
  }

  private verificarCamposObrigatorios(mod: Partial<ModalidadeCreditoDto>): string[] {
    if (this.isteste) return [];
    const faltando: string[] = [];
    if (!mod.nome) faltando.push("nome");
    if (!mod.tipoJuros) faltando.push("tipoJuros");
    if (mod.idadeMinima == null) faltando.push("idadeMinima");
    if (mod.idadeMaxima == null) faltando.push("idadeMaxima");
    if (mod.prazoAnos == null) faltando.push("prazoAnos");
    return faltando;
  }

  async verificarModalidadeCreditoUpdate(mod: Partial<ModalidadeCreditoDto>) {
    this.erros = [];

    if (!this.isteste) {
      if (mod.nome !== undefined && mod.nome.trim().length === 0) {
        this.erros.push(new Error(`Nome inválido: '${mod.nome}'`));
      }

      if (mod.tipoJuros !== undefined && !["simples", "composto"].includes(mod.tipoJuros.toLowerCase())) {
        this.erros.push(new Error(`Tipo de juros inválido: '${mod.tipoJuros}'. Esperado: 'simples' ou 'composto'`));
      }

      if (mod.idadeMinima !== undefined && mod.idadeMinima < 18) {
        this.erros.push(new Error(`Idade mínima inválida: '${mod.idadeMinima}'. Deve ser >= 18`));
      }

      if (mod.idadeMaxima !== undefined && mod.idadeMinima !== undefined && mod.idadeMaxima < mod.idadeMinima) {
        this.erros.push(
          new Error(`Idade máxima inválida: '${mod.idadeMaxima}'. Deve ser >= idade mínima (${mod.idadeMinima})`)
        );
      }

      if (mod.idadeMaxima !== undefined && mod.idadeMinima === undefined && mod.idadeMaxima < 18) {
        this.erros.push(new Error(`Idade máxima inválida: '${mod.idadeMaxima}'. Deve ser >= 18`));
      }

      if (mod.prazoAnos !== undefined && mod.prazoAnos <= 0) {
        this.erros.push(new Error(`Prazo em anos inválido: '${mod.prazoAnos}'. Deve ser maior que zero`));
      }

      if (this.erros.length > 0) {
        const error = new Error("Erros de validação");
        (error as any).statusCode = 400;
        (error as any).details = this.erros.map((e) => e.message);
        throw error;
      }
    }
  }
}
