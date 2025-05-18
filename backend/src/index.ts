import express, { Request, Response } from "express";
import { clienteDto } from "./dtos/cliente.dto";
import { FiltroClienteDto } from "./dtos/filtroCliente.dto";
import { ModalidadeCreditoDto } from "./dtos/modalidadeCredito.dto";
import { ClienteService } from "./services/clienteService";
import { ModalidadeCreditoService } from "./services/modalidadeCreditoService";

const app = express();
const PORT = 3000;
const clienteService: ClienteService = new ClienteService();
const modadelidadeCreditoService: ModalidadeCreditoService = new ModalidadeCreditoService();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

//CLIENTE
app.post("/clientes", async (req: Request, res: Response) => {
  const cliente: clienteDto = req.body;
  const clienteCriado: clienteDto = await clienteService.criarCliente(cliente);
  res.json(clienteCriado);
});

app.get("/clientes", async (req: Request, res: Response) => {
  const filtros: FiltroClienteDto = {
    idadeMin: req.query.idadeMin ? Number(req.query.idadeMin) : undefined,
    idadeMax: req.query.idadeMax ? Number(req.query.idadeMax) : undefined,
    rendaMin: req.query.rendaMin ? Number(req.query.rendaMin) : undefined,
    rendaMax: req.query.rendaMax ? Number(req.query.rendaMax) : undefined,
  };

  const listaCliente: clienteDto[] = await clienteService.buscarClientes(filtros);
  res.json(listaCliente);
});

app.put("/clientes/:cpf", async (req: Request, res: Response) => {
  const cpf: string = req.params.cpf;
  const alteracoesCliente: clienteDto = req.body;
  const clienteAtualizado: clienteDto = await clienteService.atualizarCliente(cpf, alteracoesCliente);
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

app.put("/modalidades-credito/:id", async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const alteracoesModalidade: ModalidadeCreditoDto = req.body;

  const modalidadeAtualizada: ModalidadeCreditoDto = await modadelidadeCreditoService.atualizarModalidade(
    id,
    alteracoesModalidade
  );
  res.json(modalidadeAtualizada);
});

app.patch("/modalidades-credito/:id/ativacao", async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const novoEstado: boolean = req.body.ativo;

  const modalidadeAtualizada: ModalidadeCreditoDto = await modadelidadeCreditoService.atualizarEstado(id, novoEstado);
  res.json(modalidadeAtualizada);
});
//FIM MODALIDADE DE CRÉDITO

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
