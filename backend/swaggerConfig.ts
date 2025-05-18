import { OpenAPIV3 } from "openapi-types";

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: "API de Crédito Imobiliário",
    version: "1.0.0",
    description:
      "Documentação da API para gerenciamento de clientes, modalidades de crédito, linhas de financiamento e solicitações de financiamento.",
  },
  servers: [{ url: "http://localhost:3000", description: "Servidor local" }],
  tags: [
    { name: "Cliente", description: "Operações relacionadas a clientes" },
    { name: "ModalidadeCredito", description: "Operações relacionadas a modalidades de crédito" },
    { name: "LinhaFinanceamento", description: "Operações relacionadas a linhas de financiamento" },
    { name: "SolicitacaoCredito", description: "Operações relacionadas a solicitações de crédito" },
  ],
  paths: {
    "/clientes": {
      post: {
        tags: ["Cliente"],
        summary: "Criar um novo cliente",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ClientEntradaDto" } } },
        },
        responses: {
          "200": {
            description: "Cliente criado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ClienteSaidaDto" } } },
          },
          "400": {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "500": { description: "Erro interno do servidor" },
        },
      },
      get: {
        tags: ["Cliente"],
        summary: "Listar clientes com filtros opcionais",
        parameters: [
          { name: "idadeMin", in: "query", schema: { type: "integer" }, required: false },
          { name: "idadeMax", in: "query", schema: { type: "integer" }, required: false },
          { name: "rendaMin", in: "query", schema: { type: "number" }, required: false },
          { name: "rendaMax", in: "query", schema: { type: "number" }, required: false },
        ],
        responses: {
          "200": {
            description: "Lista de clientes",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/ClienteSaidaDto" } },
              },
            },
          },
          "400": {
            description: "Parâmetros inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
    },
    "/clientes/{cpf}": {
      put: {
        tags: ["Cliente"],
        summary: "Atualizar cliente pelo CPF",
        parameters: [{ name: "cpf", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ClientEntradaDto" } } },
        },
        responses: {
          "200": {
            description: "Cliente atualizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ClienteSaidaDto" } } },
          },
          "400": {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "404": {
            description: "Cliente não encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
    },
    "/modalidades-credito": {
      post: {
        tags: ["ModalidadeCredito"],
        summary: "Criar modalidade de crédito",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ModalidadeCreditoDto" } } },
        },
        responses: {
          "200": {
            description: "Modalidade criada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ModalidadeCreditoDto" } } },
          },
          "400": {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
      get: {
        tags: ["ModalidadeCredito"],
        summary: "Listar modalidades",
        responses: {
          "200": {
            description: "Lista de modalidades",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/ModalidadeCreditoDto" } },
              },
            },
          },
        },
      },
    },
    "/modalidades-credito/{id}": {
      patch: {
        tags: ["ModalidadeCredito"],
        summary: "Atualizar modalidade pelo ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/ModalidadeCreditoDto" } } },
        },
        responses: {
          "200": {
            description: "Modalidade atualizada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ModalidadeCreditoDto" } } },
          },
          "400": {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "404": {
            description: "Modalidade não encontrada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
    },
    "/linhas-financeamento": {
      post: {
        tags: ["LinhaFinanceamento"],
        summary: "Criar linha de financiamento",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LinhaFinanceamentoDto" } } },
        },
        responses: {
          "200": {
            description: "Linha criada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/LinhaFinanceamentoDto" } } },
          },
          "400": {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
      get: {
        tags: ["LinhaFinanceamento"],
        summary: "Listar linhas",
        responses: {
          "200": {
            description: "Lista de linhas",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/LinhaFinanceamentoDto" } },
              },
            },
          },
        },
      },
    },
    "/linhas-financeamento/{id}": {
      patch: {
        tags: ["LinhaFinanceamento"],
        summary: "Atualizar linha pelo ID",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/LinhaFinanceamentoDto" } } },
        },
        responses: {
          "200": {
            description: "Linha atualizada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/LinhaFinanceamentoDto" } } },
          },
          "400": {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
          "404": {
            description: "Linha não encontrada",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
    },
    "/solicitacoes-financeamento": {
      post: {
        tags: ["SolicitacaoCredito"],
        summary: "Criar solicitação de financiamento",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/SolicitacaoFinanceamentoEntradaDto" } },
          },
        },
        responses: {
          "200": {
            description: "Solicitação criada",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/SolicitacaoFinanceamentoSaidaDto" } },
            },
          },
          "400": {
            description: "Dados inválidos",
            content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } },
          },
        },
      },
      get: {
        tags: ["SolicitacaoCredito"],
        summary: "Listar solicitações",
        responses: {
          "200": {
            description: "Lista de solicitações",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/SolicitacaoFinanceamentoSaidaDto" } },
              },
            },
          },
        },
      },
    },
    "/solicitacoes-financeamento/{cpf}": {
      get: {
        tags: ["SolicitacaoCredito"],
        summary: "Listar solicitações por CPF",
        parameters: [{ name: "cpf", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          "200": {
            description: "Lista de solicitações do cliente",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/SolicitacaoFinanceamentoSaidaDto" } },
              },
            },
          },
        },
      },
    },
    "/solicitacoes-financeamento/{id}": {
      patch: {
        tags: ["SolicitacaoCredito"],
        summary: "Atualizar status da solicitação",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "string", enum: ["aprovada", "pendente", "reprovada"] } } },
        },
        responses: {
          "200": {
            description: "Solicitação atualizada",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/SolicitacaoFinanceamentoSaidaDto" } },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ClientEntradaDto: {
        type: "object",
        required: ["cpf", "tipo", "nome", "idade", "renda"],
        properties: {
          cpf: { type: "string" },
          tipo: { type: "string" },
          nome: { type: "string" },
          idade: { type: "integer" },
          renda: { type: "number" },
          Telefones: { type: "array", items: { $ref: "#/components/schemas/TelefoneDto" } },
        },
      },
      ClienteSaidaDto: {
        type: "object",
        required: ["tipo", "nome", "idade", "renda"],
        properties: {
          tipo: { type: "string" },
          nome: { type: "string" },
          idade: { type: "integer" },
          renda: { type: "number" },
          Telefones: { type: "array", items: { $ref: "#/components/schemas/TelefoneDto" }, nullable: true },
        },
      },
      TelefoneDto: {
        type: "object",
        required: ["numero"],
        properties: { numero: { type: "string", pattern: "^\\d{11}$" } },
      },
      ModalidadeCreditoDto: {
        type: "object",
        required: ["id", "nome", "tipoJuros", "idadeMinima", "idadeMaxima", "prazoAnos"],
        properties: {
          id: { type: "integer" },
          nome: { type: "string" },
          tipoJuros: { type: "string" },
          taxaJuros: { type: "number", nullable: true },
          taxaAdministracao: { type: "number", nullable: true },
          idadeMinima: { type: "integer" },
          idadeMaxima: { type: "integer" },
          rendaMinima: { type: "number", nullable: true },
          rendaMaxima: { type: "number", nullable: true },
          prazoAnos: { type: "integer" },
          ativo: { type: "boolean" },
        },
      },
      LinhaFinanceamentoDto: {
        type: "object",
        required: ["tipoImovel", "criterioElegibilidade"],
        properties: {
          id: { type: "integer" },
          ativo: { type: "boolean" },
          tipoImovel: { type: "string" },
          criterioElegibilidade: { type: "string" },
        },
      },
      SolicitacaoFinanceamentoEntradaDto: {
        type: "object",
        required: ["id", "clienteCpf", "status", "modalidadeCreditoId", "linhaFinanceamentoId"],
        properties: {
          id: { type: "integer" },
          clienteCpf: { type: "string" },
          status: { type: "string", enum: ["aprovada", "pendente", "reprovada"] },
          modalidadeCreditoId: { type: "integer" },
          linhaFinanceamentoId: { type: "integer" },
        },
      },
      SolicitacaoFinanceamentoSaidaDto: {
        type: "object",
        required: ["id", "cliente", "status", "modalidadeCredito", "linhaFinanceamento"],
        properties: {
          id: { type: "integer" },
          cliente: { $ref: "#/components/schemas/ClienteSaidaDto" },
          status: { type: "string", enum: ["aprovada", "pendente", "reprovada"] },
          modalidadeCredito: { $ref: "#/components/schemas/ModalidadeCreditoDto" },
          linhaFinanceamento: { $ref: "#/components/schemas/LinhaFinanceamentoDto" },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: { message: { type: "string" } },
      },
    },
  },
};
