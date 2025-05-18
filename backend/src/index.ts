import express, { Request, Response } from "express";
import { FiltroClienteDto } from "./dtos/filtroCliente.dto";
import { ModalidadeCreditoDto } from "./dtos/modalidadeCredito.dto";
import { ClienteService } from "./services/clienteService";
import { ModalidadeCreditoService } from "./services/modalidadeCreditoService";
import { LinhaFinanceamentoDto } from "./dtos/linhaFinanceamento.dto";
import { LinhaFinanceamentoService } from "./services/linhaFinanceamentoService";
import { ClienteInputDto, ClienteOutputDto } from "./dtos/cliente.dto";

const app = express();
const PORT = 3000;
const clienteService: ClienteService = new ClienteService();
const modadelidadeCreditoService: ModalidadeCreditoService = new ModalidadeCreditoService();
const linhaFinanceamentoService: LinhaFinanceamentoService = new LinhaFinanceamentoService();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

//CLIENTE
app.post("/clientes", async (req: Request, res: Response) => {
  const cliente: ClienteInputDto = req.body;
  const clienteCriado: ClienteOutputDto = await clienteService.criarCliente(cliente);
  res.json(clienteCriado);
});

app.get("/clientes", async (req: Request, res: Response) => {
  const filtros: FiltroClienteDto = {
    idadeMin: req.query.idadeMin ? Number(req.query.idadeMin) : undefined,
    idadeMax: req.query.idadeMax ? Number(req.query.idadeMax) : undefined,
    rendaMin: req.query.rendaMin ? Number(req.query.rendaMin) : undefined,
    rendaMax: req.query.rendaMax ? Number(req.query.rendaMax) : undefined,
  };

  const listaCliente: ClienteOutputDto[] = await clienteService.buscarClientes(filtros);
  res.json(listaCliente);
});

app.put("/clientes/:cpf", async (req: Request, res: Response) => {
  const cpf: string = req.params.cpf;
  const alteracoesCliente: ClienteInputDto = req.body;
  const clienteAtualizado: ClienteOutputDto = await clienteService.atualizarCliente(cpf, alteracoesCliente);
  res.send(clienteAtualizado);
});
//FIM CLIENTE


//MODALIDADE DE CRÉDITO
app.post("/modalidades-credito", async (req: Request, res: Response) => {
  const modalidadeCredito: ModalidadeCreditoDto = req.body;
  const modalidadeCreditoCriada: ModalidadeCreditoDto = await modadelidadeCreditoService.criarModalidadeCredito(
    modalidadeCredito
  );

  res.json(modalidadeCreditoCriada);
});

app.get("/modalidades-credito", async (req: Request, res: Response) => {
  const listaModalidadeCredito: ModalidadeCreditoDto[] = await modadelidadeCreditoService.buscarModalidades();
  res.json(listaModalidadeCredito);
});

app.patch("/modalidades-credito/:id", async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const alteracoesModalidade: ModalidadeCreditoDto = req.body;

  const modalidadeAtualizada: ModalidadeCreditoDto = await modadelidadeCreditoService.atualizarModalidade(
    id,
    alteracoesModalidade
  );
  res.json(modalidadeAtualizada);
});
//FIM MODALIDADE DE CRÉDITO

//LINHA FINANCEAMENTO
app.post("/linhas-financeamento", async (req: Request, res: Response) => {
  const linhaFinanceamento: Required<LinhaFinanceamentoDto> = req.body;
  const linhaFinanceamentoCriada: LinhaFinanceamentoDto = await linhaFinanceamentoService.criar(linhaFinanceamento);
  res.json(linhaFinanceamentoCriada);
});

app.get("/linhas-financeamento", async (req: Request, res: Response) => {
  const listaLinhaFinanceamento: LinhaFinanceamentoDto[] = await linhaFinanceamentoService.buscarTodas();
  res.json(listaLinhaFinanceamento);
});

app.patch("/linhas-financeamento/:id", async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const alteracoesLinhaFinanceamento: LinhaFinanceamentoDto = req.body;
  const linhaFinanceamentoAtualizada: LinhaFinanceamentoDto = await linhaFinanceamentoService.atualizar(
    id,
    alteracoesLinhaFinanceamento
  );
  res.json(linhaFinanceamentoAtualizada);
});
//FIM LINHA FINANCEAMENTO

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
