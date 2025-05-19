# 1. Clone o repositório

git clone https://gitlab.cin.ufpe.br/dcg/projeto_credito_imobiliario.git
cd projeto_credito_imobiliario

# 2. Instale as dependências

npm install

# ou

yarn install

# 3. Configure o ambiente (crie um arquivo .env com base no .env.example)

cp .env.example .env

# depois edite o arquivo .env com as informações do seu banco PostgreSQL

formato: DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=SCHEMA"

# 4. Execute as migrações do banco de dados

npx prisma migrate dev --name init

# ou

yarn prisma migrate dev --name init

# 5. adicione a seguinte linha "ts-node-dev --respawn src/index.ts" a sessão "scripts" em package.json

# 6. Rode o projeto em ambiente de desenvolvimento

npm run dev

# ou

yarn dev

#8. Modelagem do Banco de Dados

O sistema utiliza o Prisma ORM com PostgreSQL como banco de dados relacional. Abaixo estão descritos os modelos, campos e relacionamentos da aplicação.

🧾 Entidades e Relacionamentos
🔹 Cliente
Representa uma pessoa que solicita crédito.

cpf (PK): string – Identificador único do cliente.

tipo: string – Pode indicar se é pessoa física ou jurídica.

nome: string – Nome completo do cliente.

idade: int – Idade em anos.

renda: float – Renda mensal.

Relacionamentos:

Possui vários Telefones.

Possui várias SolicitacoesCredito.

🔹 Telefone
Armazena os números de telefone dos clientes.

id (PK): int – Identificador único.

cpf (FK): string – Referência ao cliente.

numero: string – Número de telefone.

🔹 ModalidadeCredito
Define uma modalidade de crédito disponível.

id (PK): int – Identificador único.

nome: string – Nome da modalidade.

tipoJuros: string – Tipo de juros aplicados.

taxaJuros: float (opcional) – Taxa de juros percentual.

taxaAdministracao: float (opcional) – Taxa administrativa.

idadeMinima: int – Idade mínima exigida.

idadeMaxima: int – Idade máxima permitida.

rendaMinima: decimal (opcional) – Renda mínima exigida.

rendaMaxima: decimal (opcional) – Renda máxima permitida.

prazoAnos: int – Prazo máximo em anos.

ativo: boolean – Se está disponível.

criadoEm: datetime – Data de criação.

atualizadoEm: datetime – Data da última atualização.

Relacionamentos:

É referenciada por várias SolicitacoesCredito.

🔹 LinhaFinanceamento
Define uma linha de financiamento específica.

id (PK): int – Identificador único.

tipoImovel: string – Tipo de imóvel permitido.

criterioElegibilidade: string – Critérios de elegibilidade definidos.

ativo: boolean – Se está ativa ou não.

Relacionamentos:

É referenciada por várias SolicitacoesCredito.

🔹 SolicitacaoCredito
Registra uma solicitação de crédito feita por um cliente.

id (PK): int – Identificador único.

clienteCpf (FK): string – CPF do cliente solicitante.

modalidadeCreditoId (FK): int – ID da modalidade de crédito escolhida.

linhaFinanceamentoId (FK): int – ID da linha de financiamento desejada.

status: string – Status da solicitação (pendente, aprovada, reprovada).

dataSolicitacao: datetime – Data de criação da solicitação.

atualizadoEm: datetime – Última modificação.

#8. Ferramentas utilizadas
Node.js

Express

Prisma ORM

PostgreSQL

Swagger (OpenAPI)

📌 Observações
Certifique-se de que o banco de dados esteja rodando com o nome e credenciais configuradas no .env.

O projeto utiliza o diretório prisma/ para definir e gerenciar o schema do banco.

📦 Scripts úteis
Comando Descrição
npm run dev Inicia a API em modo de desenvolvimento
npx prisma studio Abre a interface web para explorar o banco de dados
npx prisma migrate dev Executa as migrações no banco de dados
npm run build Compila o projeto para produção (caso use TypeScript)
