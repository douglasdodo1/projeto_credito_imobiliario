import { LinhaFinanceamentoDto } from "../dtos/linhaFinanceamento.dto";

export class LinhaFinanceamentoValidator {
  private isteste: boolean = true;
  private erros: Error[] = [];

  constructor(teste: boolean = false) {
    this.isteste = teste;
  }

  async verificarLinhaFinanceamentoValido(linha: Partial<LinhaFinanceamentoDto>) {
    this.erros = [];

    if (!this.isteste) {
      const faltando = this.verificarCamposObrigatorios(linha);
      for (const campo of faltando) {
        this.erros.push(new Error(`Campo obrigatório ausente: '${campo}'`));
      }

      if (this.erros.length === 0) {
        if (!linha.tipoImovel || linha.tipoImovel.trim().length === 0) {
          this.erros.push(new Error(`tipoImovel inválido: '${linha.tipoImovel}'`));
        }

        if (!linha.criterioElegibilidade || linha.criterioElegibilidade.trim().length === 0) {
          this.erros.push(new Error(`criterioElegibilidade inválido: '${linha.criterioElegibilidade}'`));
        }

        if (linha.ativo === undefined || linha.ativo === null) {
          this.erros.push(new Error(`Campo 'ativo' é obrigatório e deve ser booleano`));
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

  async verificarLinhaFinanceamentoUpdate(linha: Partial<LinhaFinanceamentoDto>) {
    this.erros = [];

    if (!this.isteste) {
      if (linha.tipoImovel !== undefined && linha.tipoImovel.trim().length === 0) {
        this.erros.push(new Error(`tipoImovel inválido: '${linha.tipoImovel}'`));
      }

      if (linha.criterioElegibilidade !== undefined && linha.criterioElegibilidade.trim().length === 0) {
        this.erros.push(new Error(`criterioElegibilidade inválido: '${linha.criterioElegibilidade}'`));
      }

      if (linha.ativo !== undefined && typeof linha.ativo !== "boolean") {
        this.erros.push(new Error(`Campo 'ativo' inválido: '${linha.ativo}'. Deve ser booleano`));
      }
    }

    if (this.erros.length > 0) {
      const error = new Error("Erros de validação");
      (error as any).statusCode = 400;
      (error as any).details = this.erros.map((e) => e.message);
      throw error;
    }
  }

  private verificarCamposObrigatorios(linha: Partial<LinhaFinanceamentoDto>): string[] {
    if (this.isteste) return [];
    const faltando: string[] = [];
    if (!linha.tipoImovel) faltando.push("tipoImovel");
    if (linha.ativo === undefined) faltando.push("ativo");
    if (!linha.criterioElegibilidade) faltando.push("criterioElegibilidade");
    return faltando;
  }
}
