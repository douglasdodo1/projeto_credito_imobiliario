export interface ModalidadeCreditoDto {
  id: number;
  nome: string;
  tipoJuros: string;
  taxaJuros: number | null;
  taxaAdministracao?: number | null;
  idadeMinima: number;
  idadeMaxima: number;
  rendaMinima: number | null;
  rendaMaxima: number | null;
  prazoAnos: number;
  ativo?: boolean;
}
