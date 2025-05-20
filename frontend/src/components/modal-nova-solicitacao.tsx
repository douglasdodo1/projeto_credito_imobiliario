import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ModalidadeCreditoDto } from "@/app/dtos/modalidadeCredito.dto";
import { LinhaFinanceamentoDto } from "@/app/dtos/linhaFinanceamento.dto";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface NovaSolicitacaoModalProps {
  open: boolean;
  onClose: () => void;
  onCriar: (modalidadeId: number, linhaId: number) => void;
}

export default function NovaSolicitacaoModal({ open, onClose, onCriar }: NovaSolicitacaoModalProps) {
  const [modalidades, setModalidades] = useState<ModalidadeCreditoDto[]>([]);
  const [linhas, setLinhas] = useState<LinhaFinanceamentoDto[]>([]);
  const [modalidadeSelecionada, setModalidadeSelecionada] = useState<ModalidadeCreditoDto | null>(null);
  const [linhaSelecionada, setLinhaSelecionada] = useState<LinhaFinanceamentoDto | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    if (!open) return;
    axios.get<ModalidadeCreditoDto[]>("http://localhost:3000/modalidades-credito").then((res) => {
      setModalidades(res.data.filter((m) => m.ativo));
    });
    axios.get<LinhaFinanceamentoDto[]>("http://localhost:3000/linhas-financeamento").then((res) => {
      setLinhas(res.data.filter((l) => l.ativo));
    });
  }, [open]);

  const handleCriar = () => {
    if (modalidadeSelecionada && linhaSelecionada) {
      onCriar(modalidadeSelecionada.id, linhaSelecionada.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => (val ? null : onClose())}>
      <DialogContent
        className={cn("max-w-2xl", theme === "dark" ? "bg-zinc-900 text-zinc-100" : "bg-white text-zinc-900")}
      >
        <DialogHeader>
          <DialogTitle>Nova Solicitação de Crédito</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="modalidades" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="modalidades">Modalidades</TabsTrigger>
            <TabsTrigger value="linhas">Linhas</TabsTrigger>
          </TabsList>

          <TabsContent value="modalidades">
            <ul className="mt-2 space-y-2 max-h-60 overflow-auto">
              {modalidades.map((mod) => (
                <li
                  key={mod.id}
                  onClick={() => setModalidadeSelecionada(mod)}
                  className={cn(
                    "p-3 border rounded cursor-pointer text-sm transition-colors",
                    modalidadeSelecionada?.id === mod.id
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "border-zinc-600 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
                  )}
                >
                  <p className="font-semibold">{mod.nome}</p>
                  <p className="text-xs mt-1">
                    Tipo de Juros: {mod.tipoJuros} — Taxa: {mod.taxaJuros ?? "N/A"}% — Administração:{" "}
                    {mod.taxaAdministracao ?? "N/A"}%
                  </p>
                  <p className="text-xs">
                    Idade: {mod.idadeMinima}–{mod.idadeMaxima} anos — Renda: R$
                    {mod.rendaMinima ?? "?"} até R${mod.rendaMaxima ?? "?"}
                  </p>
                  <p className="text-xs">Prazo: {mod.prazoAnos} anos</p>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="linhas">
            <ul className="mt-2 space-y-2 max-h-60 overflow-auto">
              {linhas.map((lin) => (
                <li
                  key={lin.id}
                  onClick={() => setLinhaSelecionada(lin)}
                  className={cn(
                    "p-3 border rounded cursor-pointer text-sm transition-colors",
                    linhaSelecionada?.id === lin.id
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "border-zinc-600 text-zinc-200 hover:bg-zinc-700 hover:text-white"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
                  )}
                >
                  <p className="font-semibold">{lin.tipoImovel ?? "Tipo não informado"}</p>
                  <p className="text-xs mt-1">Critério de Elegibilidade: {lin.criterioElegibilidade ?? "N/A"}</p>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-end">
          <Button onClick={handleCriar} disabled={!modalidadeSelecionada || !linhaSelecionada}>
            Criar Solicitação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
