import express, { Request, Response } from "express";
import { FiltroClienteDto } from "./dtos/filtroCliente.dto";
import { ModalidadeCreditoDto } from "./dtos/modalidadeCredito.dto";
import { ClienteService } from "./services/clienteService";
import { ModalidadeCreditoService } from "./services/modalidadeCreditoService";
import { LinhaFinanceamentoDto } from "./dtos/linhaFinanceamento.dto";
import { LinhaFinanceamentoService } from "./services/linhaFinanceamentoService";
import { ClientEntradaDto, ClienteSaidaDto } from "./dtos/cliente.dto";
import { swaggerSpec } from "../swaggerConfig";
import swaggerUi from "swagger-ui-express";
import {
  SolicitacaoFinanceamentoEntradaDto,
  SolicitacaoFinanceamentoSaidaDto,
} from "./dtos/solicitacaoFinanceamento.dto";
import { SolicitacaoFinanceamentoService } from "./services/solicitacaoFinanceamentoService";
import { catchAsync } from "./utils/catchAsync";
import { errorHandler } from "./middlewares/erroHandler";
import cors from "cors";

const app = express();
const PORT = 3000;
const clienteService: ClienteService = new ClienteService();
const modadelidadeCreditoService: ModalidadeCreditoService = new ModalidadeCreditoService();
const linhaFinanceamentoService: LinhaFinanceamentoService = new LinhaFinanceamentoService();
const solicitacaoFinanceamentoService: SolicitacaoFinanceamentoService = new SolicitacaoFinanceamentoService();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

//CLIENTE
app.post(
  "/clientes",
  catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
    const cliente: ClientEntradaDto = req.body;
    const clienteCriado: ClienteSaidaDto = await clienteService.criar(cliente);
    res.json(clienteCriado);
  })
);

app.get(
  "/clientes",
  catchAsync(async (req: Request, res: Response) => {
    const filtros: FiltroClienteDto = {
      idadeMin: req.query.idadeMin ? Number(req.query.idadeMin) : undefined,
      idadeMax: req.query.idadeMax ? Number(req.query.idadeMax) : undefined,
      rendaMin: req.query.rendaMin ? Number(req.query.rendaMin) : undefined,
      rendaMax: req.query.rendaMax ? Number(req.query.rendaMax) : undefined,
    };
    const listaCliente: ClienteSaidaDto[] = await clienteService.buscarTodos(filtros);
    res.json(listaCliente);
  })
);

app.get(
  "/clientes/:cpf",
  catchAsync(async (req: Request, res: Response) => {
    const cpf: string = req.params.cpf;
    console.log("AQUI");
    console.log(cpf);

    const cliente: ClienteSaidaDto = await clienteService.buscarPorCpf(cpf);
    res.send(cliente);
  })
);

app.put(
  "/clientes/:cpf",
  catchAsync(async (req: Request, res: Response) => {
    const cpf: string = req.params.cpf;
    const alteracoesCliente: ClientEntradaDto = req.body;
    const clienteAtualizado: ClienteSaidaDto = await clienteService.atualizar(cpf, alteracoesCliente);
    console.log(clienteAtualizado);

    res.send(clienteAtualizado);
  })
);

//MODALIDADE DE CRÉDITO
app.post(
  "/modalidades-credito",
  catchAsync(async (req: Request, res: Response) => {
    const modalidadeCredito: ModalidadeCreditoDto = req.body;
    const modalidadeCreditoCriada: ModalidadeCreditoDto = await modadelidadeCreditoService.criar(modalidadeCredito);

    res.json(modalidadeCreditoCriada);
  })
);

app.get(
  "/modalidades-credito",
  catchAsync(async (req: Request, res: Response) => {
    const listaModalidadeCredito: ModalidadeCreditoDto[] = await modadelidadeCreditoService.buscarTodas();
    res.json(listaModalidadeCredito);
  })
);

app.patch(
  "/modalidades-credito/:id",
  catchAsync(async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const alteracoesModalidade: ModalidadeCreditoDto = req.body;

    const modalidadeAtualizada: ModalidadeCreditoDto = await modadelidadeCreditoService.atualizar(
      id,
      alteracoesModalidade
    );
    res.json(modalidadeAtualizada);
  })
);

//LINHA FINANCEAMENTO
app.post(
  "/linhas-financeamento",
  catchAsync(async (req: Request, res: Response) => {
    const linhaFinanceamento: Required<LinhaFinanceamentoDto> = req.body;
    const linhaFinanceamentoCriada: LinhaFinanceamentoDto = await linhaFinanceamentoService.criar(linhaFinanceamento);
    res.json(linhaFinanceamentoCriada);
  })
);

app.get(
  "/linhas-financeamento",
  catchAsync(async (req: Request, res: Response) => {
    const listaLinhaFinanceamento: LinhaFinanceamentoDto[] = await linhaFinanceamentoService.buscarTodas();
    res.json(listaLinhaFinanceamento);
  })
);

app.patch(
  "/linhas-financeamento/:id",
  catchAsync(async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const alteracoesLinhaFinanceamento: LinhaFinanceamentoDto = req.body;
    const linhaFinanceamentoAtualizada: LinhaFinanceamentoDto = await linhaFinanceamentoService.atualizar(
      id,
      alteracoesLinhaFinanceamento
    );
    res.json(linhaFinanceamentoAtualizada);
  })
);

//SOLICITACAO FINANCEAMENTO
app.post(
  "/solicitacoes-financeamento",
  catchAsync(async (req: Request, res: Response) => {
    const solicitacaoFinanceamento: SolicitacaoFinanceamentoEntradaDto = req.body;
    const solicitacaoFinanceamentoCriada: SolicitacaoFinanceamentoSaidaDto =
      await solicitacaoFinanceamentoService.criar(solicitacaoFinanceamento);
    res.json(solicitacaoFinanceamentoCriada);
  })
);

app.get(
  "/solicitacoes-financeamento",
  catchAsync(async (req: Request, res: Response) => {
    const listaSolicitacoesFinanceamento = await solicitacaoFinanceamentoService.buscarTodas();
    res.json(listaSolicitacoesFinanceamento);
  })
);

app.get(
  "/solicitacoes-financeamento/:cpf",
  catchAsync(async (req: Request, res: Response) => {
    const cpf: string = req.params.cpf;

    const listaSolicitacoesFinanceamento = await solicitacaoFinanceamentoService.buscarTodas(cpf);
    res.json(listaSolicitacoesFinanceamento);
  })
);

app.patch(
  "/solicitacoes-financeamento/:id",
  catchAsync(async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const novoEstado: string = req.body.status;
    const solicitacaoAtualizada = await solicitacaoFinanceamentoService.atualizarEstado(id, novoEstado);
    res.json(solicitacaoAtualizada);
  })
);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Documentação Swagger: http://localhost:3000/api-docs");
});
