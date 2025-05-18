import prisma from "../src/creditoImobiliarioDB";

async function main() {
  // Clientes e telefones
  for (let i = 1; i <= 5; i++) {
    const cpf = i.toString().padStart(11, "0");

    await prisma.cliente.create({
      data: {
        cpf,
        tipo: i % 2 === 0 ? "Pessoa Jurídica" : "Pessoa Física",
        nome: `Cliente ${i}`,
        idade: Math.floor(Math.random() * 50) + 18,
        renda: parseFloat((Math.random() * 13000 + 2000).toFixed(2)),
        Telefones: {
          create: [
            { numero: `(11)9${Math.floor(Math.random() * 90000000 + 10000000)}` },
            { numero: `(11)9${Math.floor(Math.random() * 90000000 + 10000000)}` },
          ],
        },
      },
    });
  }

  // Modalidades de crédito
  for (let i = 1; i <= 5; i++) {
    await prisma.modalidadeCredito.create({
      data: {
        nome: `Modalidade ${i}`,
        ativo: true,
        tipoJuros: i % 2 === 0 ? "composto" : "simples",
        taxaJuros: parseFloat((Math.random() * 4 + 1).toFixed(2)),
        taxaAdministracao: parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)),
        idadeMinima: 18,
        idadeMaxima: 65,
        rendaMinima: parseFloat((Math.random() * 4000 + 1000).toFixed(2)),
        rendaMaxima: parseFloat((Math.random() * 10000 + 10000).toFixed(2)),
        prazoAnos: Math.floor(Math.random() * 25 + 5),
      },
    });
  }

  // Linhas de financiamento
  for (let i = 1; i <= 5; i++) {
    await prisma.linhaFinanceamento.create({
      data: {
        tipoImovel: `Tipo Imóvel ${i}`,
        ativo: true,
        criterioElegibilidade: `Critério ${i}`,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seed concluída com sucesso 🚀");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Erro na seed:", e);
    prisma.$disconnect();
    process.exit(1);
  });
