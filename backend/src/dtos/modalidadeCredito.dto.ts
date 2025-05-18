export interface ModalidadeCreditoDto {
  id?: number;
  nome?: string;
  ativo?: boolean;
  tipoJuros: string;
  taxaJuros: number | null;
  taxaAdministracao?: number | null;
  idadeMinima?: number | null;
  idadeMaxima?: number | null;
  rendaMinima?: number | null;
  rendaMaxima?: number | null;
  prazoAnos?: number;
  criadoEm?: Date;
  atualizadoEm?: Date;
}
