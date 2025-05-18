import { OpenAPIV3 } from "openapi-types";

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: "API de Clientes, Modalidades e Linhas de Financiamento",
    version: "1.0.0",
    description:
      "Documentação da API para gerenciamento de clientes, modalidades de crédito e linhas de financiamento.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  tags: [
    {
      name: "Cliente",
      description: "Operações relacionadas a clientes",
    },
    {
      name: "ModalidadeCredito",
      description: "Operações relacionadas a modalidades de crédito",
    },
    {
      name: "LinhaFinanceamento",
      description: "Operações relacionadas a linhas de financiamento",
    },
  ],
  paths: {
    "/clientes": {
      post: {
        tags: ["Cliente"],
        summary: "Criar um novo cliente",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ClienteInputDto" },
            },
          },
        },
        responses: {
          "200": {
            description: "Cliente criado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ClienteOutputDto" },
              },
            },
          },
          "400": {
            description: "Dados inválidos na requisição",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "500": {
            description: "Erro interno do servidor",
          },
        },
      },
      get: {
        tags: ["Cliente"],
        summary: "Buscar clientes com filtros opcionais",
        parameters: [
          {
            name: "idadeMin",
            in: "query",
            schema: { type: "integer" },
            description: "Idade mínima do cliente",
            required: false,
          },
          {
            name: "idadeMax",
            in: "query",
            schema: { type: "integer" },
            description: "Idade máxima do cliente",
            required: false,
          },
          {
            name: "rendaMin",
            in: "query",
            schema: { type: "number" },
            description: "Renda mínima",
            required: false,
          },
          {
            name: "rendaMax",
            in: "query",
            schema: { type: "number" },
            description: "Renda máxima",
            required: false,
          },
        ],
        responses: {
          "200": {
            description: "Lista de clientes retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ClienteOutputDto" },
                },
              },
            },
          },
          "400": {
            description: "Parâmetros de filtro inválidos",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
    "/clientes/{cpf}": {
      put: {
        tags: ["Cliente"],
        summary: "Atualizar cliente pelo CPF",
        parameters: [
          {
            name: "cpf",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "CPF do cliente a ser atualizado",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ClienteInputDto" },
            },
          },
        },
        responses: {
          "200": {
            description: "Cliente atualizado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ClienteOutputDto" },
              },
            },
          },
          "400": {
            description: "Dados inválidos na atualização",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "404": {
            description: "Cliente não encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
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
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModalidadeCreditoDto" },
            },
          },
        },
        responses: {
          "200": {
            description: "Modalidade de crédito criada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ModalidadeCreditoDto" },
              },
            },
          },
          "400": {
            description: "Dados inválidos para criação",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      get: {
        tags: ["ModalidadeCredito"],
        summary: "Listar modalidades de crédito",
        responses: {
          "200": {
            description: "Lista de modalidades retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/ModalidadeCreditoDto" },
                },
              },
            },
          },
        },
      },
    },
    "/modalidades-credito/{id}": {
      patch: {
        tags: ["ModalidadeCredito"],
        summary: "Atualizar modalidade de crédito pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID da modalidade a ser atualizada",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModalidadeCreditoDto" },
            },
          },
        },
        responses: {
          "200": {
            description: "Modalidade atualizada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ModalidadeCreditoDto" },
              },
            },
          },
          "400": {
            description: "Dados inválidos para atualização",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "404": {
            description: "Modalidade não encontrada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
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
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LinhaFinanceamentoDto" },
            },
          },
        },
        responses: {
          "200": {
            description: "Linha de financiamento criada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LinhaFinanceamentoDto" },
              },
            },
          },
          "400": {
            description: "Dados inválidos para criação",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
      get: {
        tags: ["LinhaFinanceamento"],
        summary: "Listar linhas de financiamento",
        responses: {
          "200": {
            description: "Lista de linhas retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/LinhaFinanceamentoDto" },
                },
              },
            },
          },
        },
      },
    },
    "/linhas-financeamento/{id}": {
      patch: {
        tags: ["LinhaFinanceamento"],
        summary: "Atualizar linha de financiamento pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
            description: "ID da linha a ser atualizada",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LinhaFinanceamentoDto" },
            },
          },
        },
        responses: {
          "200": {
            description: "Linha de financiamento atualizada com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LinhaFinanceamentoDto" },
              },
            },
          },
          "400": {
            description: "Dados inválidos para atualização",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
          "404": {
            description: "Linha de financiamento não encontrada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ClienteInputDto: {
        type: "object",
        properties: {
          cpf: { type: "string" },
          tipo: { type: "string" },
          nome: { type: "string" },
          idade: { type: "integer" },
          renda: { type: "number" },
          Telefones: {
            type: "array",
            items: {
              type: "object",
              properties: {
                numero: { type: "string" },
              },
              required: ["numero"],
            },
          },
        },
        required: ["cpf", "tipo", "nome", "idade", "renda", "Telefones"],
      },
      ClienteOutputDto: {
        type: "object",
        properties: {
          tipo: { type: "string" },
          nome: { type: "string" },
          idade: { type: "integer" },
          renda: { type: "number" },
          Telefones: {
            type: "array",
            items: {
              type: "object",
              properties: {
                numero: { type: "string" },
              },
            },
            nullable: true,
          },
        },
        required: ["tipo", "nome", "idade", "renda"],
      },
      FiltroClienteDto: {
        type: "object",
        properties: {
          idadeMin: { type: "integer" },
          idadeMax: { type: "integer" },
          rendaMin: { type: "number" },
          rendaMax: { type: "number" },
        },
      },
      LinhaFinanceamentoDto: {
        type: "object",
        properties: {
          tipoImovel: { type: "string" },
          criterioElegibilidade: { type: "string" },
        },
      },
      ModalidadeCreditoDto: {
        type: "object",
        properties: {
          id: { type: "integer", nullable: true },
          nome: { type: "string" },
          tipoJuros: { type: "string" },
          tipoCobranca: { type: "string" },
          quantidadeParcelas: { type: "integer" },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};
