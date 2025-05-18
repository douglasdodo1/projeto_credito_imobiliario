-- AlterTable
CREATE SEQUENCE linhafinanceamento_id_seq;
ALTER TABLE "LinhaFinanceamento" ALTER COLUMN "id" SET DEFAULT nextval('linhafinanceamento_id_seq');
ALTER SEQUENCE linhafinanceamento_id_seq OWNED BY "LinhaFinanceamento"."id";

-- AlterTable
CREATE SEQUENCE modalidadecredito_id_seq;
ALTER TABLE "ModalidadeCredito" ALTER COLUMN "id" SET DEFAULT nextval('modalidadecredito_id_seq');
ALTER SEQUENCE modalidadecredito_id_seq OWNED BY "ModalidadeCredito"."id";

-- AlterTable
CREATE SEQUENCE telefone_id_seq;
ALTER TABLE "Telefone" ALTER COLUMN "id" SET DEFAULT nextval('telefone_id_seq');
ALTER SEQUENCE telefone_id_seq OWNED BY "Telefone"."id";
