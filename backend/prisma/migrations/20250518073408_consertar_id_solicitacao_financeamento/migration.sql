-- AlterTable
CREATE SEQUENCE solicitacaocredito_id_seq;
ALTER TABLE "SolicitacaoCredito" ALTER COLUMN "id" SET DEFAULT nextval('solicitacaocredito_id_seq');
ALTER SEQUENCE solicitacaocredito_id_seq OWNED BY "SolicitacaoCredito"."id";
