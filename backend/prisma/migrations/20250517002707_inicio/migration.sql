-- CreateTable
CREATE TABLE "Cliente" (
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "renda" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "id" INTEGER NOT NULL,
    "cpf" TEXT NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModalidadeCredito" (
    "id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipoJuros" TEXT NOT NULL,
    "taxaJuros" DOUBLE PRECISION,
    "taxaAdministracao" DOUBLE PRECISION,
    "idadeMinima" INTEGER NOT NULL,
    "idadeMaxima" INTEGER NOT NULL,
    "rendaMinima" DECIMAL(65,30),
    "rendaMaxima" DECIMAL(65,30),
    "prazoAnos" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModalidadeCredito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinhaFinanceamento" (
    "id" INTEGER NOT NULL,
    "tipoImovel" TEXT NOT NULL,
    "criterioElegibilidade" TEXT NOT NULL,

    CONSTRAINT "LinhaFinanceamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitacaoCredito" (
    "id" INTEGER NOT NULL,
    "clienteCpf" TEXT NOT NULL,
    "modalidadeCreditoId" INTEGER NOT NULL,
    "linhaFinanceamentoId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "dataSolicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SolicitacaoCredito_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "Cliente"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoCredito" ADD CONSTRAINT "SolicitacaoCredito_clienteCpf_fkey" FOREIGN KEY ("clienteCpf") REFERENCES "Cliente"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoCredito" ADD CONSTRAINT "SolicitacaoCredito_modalidadeCreditoId_fkey" FOREIGN KEY ("modalidadeCreditoId") REFERENCES "ModalidadeCredito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoCredito" ADD CONSTRAINT "SolicitacaoCredito_linhaFinanceamentoId_fkey" FOREIGN KEY ("linhaFinanceamentoId") REFERENCES "LinhaFinanceamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
