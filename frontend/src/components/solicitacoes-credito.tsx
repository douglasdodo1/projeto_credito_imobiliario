"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NovaSolicitacaoModal from "./modal-nova-solicitacao";
import {
  SolicitacaoFinanceamentoEntradaDto,
  SolicitacaoFinanceamentoSaidaDto,
  StatusSolicitacao,
} from "@/app/dtos/solicitacaoFinanceamento.dto";
import { cn } from "@/lib/utils";

export default function SolicitacoesCredito() {
  const { theme } = useTheme();
  const router = useRouter();

  const [tipo, setTipo] = useState<"cliente" | "adm" | null>(null);
  const [cpf, setCpf] = useState<string>("");

  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoFinanceamentoSaidaDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [novaSolicitacaoOpen, setNovaSolicitacaoOpen] = useState(false);

  const fetchSolicitacoes = async (tipoStorage: "cliente" | "adm", cpfStorage: string) => {
    setLoading(true);
    try {
      const url =
        tipoStorage === "adm"
          ? "http://localhost:3000/solicitacoes-financeamento"
          : `http://localhost:3000/solicitacoes-financeamento/${cpfStorage}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar solicitações");
      setSolicitacoes(await res.json());
    } catch {
      setSolicitacoes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tipoStorage = localStorage.getItem("tipo") as "cliente" | "adm" | null;
    const cpfStorage = localStorage.getItem("cpf") || "";
    if (!tipoStorage || !cpfStorage) {
      router.push("/login");
      return;
    }
    setTipo(tipoStorage);
    setCpf(cpfStorage);
    fetchSolicitacoes(tipoStorage, cpfStorage);
  }, [router]);

  const atualizarStatus = async (id: number, novoStatus: StatusSolicitacao) => {
    try {
      const res = await fetch(`http://localhost:3000/solicitacoes-financeamento/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar status");
      if (tipo && cpf) fetchSolicitacoes(tipo, cpf);
    } catch {
      alert("Não foi possível atualizar status.");
    }
  };

  const handleOnCriar = async (modalidadeId: number, linhaId: number) => {
    try {
      const novaSolicitacao: SolicitacaoFinanceamentoEntradaDto = {
        clienteCpf: cpf,
        modalidadeCreditoId: modalidadeId,
        linhaFinanceamentoId: linhaId,
        status: StatusSolicitacao.PENDENTE,
      };
      const res = await fetch("http://localhost:3000/solicitacoes-financeamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaSolicitacao),
      });

      if (!res.ok) throw new Error();
      setNovaSolicitacaoOpen(false);
      if (tipo && cpf) fetchSolicitacoes(tipo, cpf);
    } catch {
      alert("Não foi possível criar a solicitação.");
    }
  };

  return (
    <main
      className={
        theme === "dark" ? "bg-[#121212] text-white p-6 min-h-screen" : "bg-white text-gray-900 p-6 min-h-screen"
      }
    >
      <Card className="mb-6 rounded-lg border transition-shadow hover:shadow-lg">
        <CardContent
          className={cn(
            "flex items-center justify-between p-4",
            theme === "dark" ? "bg-[#1e1e1e] border-zinc-700" : "bg-white border-gray-200"
          )}
        >
          <div>
            <p className={cn("text-lg font-semibold", theme === "dark" ? "text-white" : "text-gray-900")}>
              Criar nova solicitação
            </p>
            <p className="text-sm text-muted-foreground">Escolha modalidade e linha para iniciar</p>
          </div>
          <Button
            size="sm"
            onClick={() => setNovaSolicitacaoOpen(true)}
            className={cn(
              "px-2 py-1 rounded transition-colors border",
              theme === "dark"
                ? "border-zinc-600 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
            )}
          >
            + Nova Solicitação
          </Button>
        </CardContent>
      </Card>
      <NovaSolicitacaoModal
        open={novaSolicitacaoOpen}
        onClose={() => setNovaSolicitacaoOpen(false)}
        onCriar={handleOnCriar}
      />

      {loading ? (
        <p>Carregando solicitações...</p>
      ) : solicitacoes.length === 0 ? (
        <p>Nenhuma solicitação encontrada.</p>
      ) : (
        <div className="space-y-4">
          {solicitacoes.map((s) => (
            <Card
              key={s.id}
              className={cn(
                "rounded-lg border transition-shadow hover:shadow-lg",
                theme === "dark" ? "bg-[#1e1e1e] border-zinc-700" : "bg-white border-gray-200"
              )}
            >
              <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                <div className="flex-1 space-y-1">
                  <p className="text-lg font-semibold">Solicitação #{s.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Cliente: <span className="font-medium">{s.cliente.nome}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Modalidade: <span className="font-medium">{s.modalidadeCredito.nome}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Linha: <span className="font-medium">{s.linhaFinanceamento.tipoImovel}</span>
                  </p>
                </div>

                {/* Direita: badge + ações */}
                <div className="flex items-center space-x-3">
                  <Badge className="uppercase px-3 py-1">{s.status}</Badge>

                  {tipo === "adm" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          className={cn(
                            "px-2 py-1 rounded transition-colors border",
                            theme === "dark"
                              ? "border-zinc-600 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                              : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
                          )}
                        >
                          Alterar
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => atualizarStatus(s.id, StatusSolicitacao.APROVADA)}>
                          Aprovar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => atualizarStatus(s.id, StatusSolicitacao.REPROVADA)}>
                          Reprovar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
