"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ClientEntradaDto } from "@/app/dtos/cliente.dto";
import { EditarClienteModal } from "./modal-editar-cliente";
import { Card, CardContent } from "@/components/ui/card";

export default function Clientes() {
  const { theme } = useTheme();
  const [clientes, setClientes] = useState<ClientEntradaDto[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<ClientEntradaDto | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const fetchClientes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/clientes");
      setClientes(data);
    } catch (err) {
      console.error("Erro ao buscar clientes:", err);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEditar = (cliente: ClientEntradaDto) => {
    setClienteSelecionado(cliente);
    setModalAberto(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">Lista de Clientes</h2>

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className={cn(theme === "dark" ? "bg-zinc-800" : "bg-blue-100")}>
                <TableHead className="text-muted-foreground">CPF</TableHead>
                <TableHead className="text-muted-foreground">Nome</TableHead>
                <TableHead className="text-muted-foreground">Idade</TableHead>
                <TableHead className="text-muted-foreground">Renda</TableHead>
                <TableHead className="text-muted-foreground">Tipo</TableHead>
                <TableHead className="text-muted-foreground text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.cpf} className="hover:bg-muted/50 transition">
                  <TableCell>{cliente.cpf}</TableCell>
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>{cliente.idade}</TableCell>
                  <TableCell>{cliente.renda}</TableCell>
                  <TableCell>{cliente.tipo}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" variant="outline" onClick={() => handleEditar(cliente)}>
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditarClienteModal
        cliente={clienteSelecionado}
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onAtualizar={fetchClientes}
      />
    </div>
  );
}
