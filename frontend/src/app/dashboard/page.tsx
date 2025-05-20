"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRightIcon, HomeIcon, ListIcon, PlusCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import LinhasFinanceamento from "@/components/linhas-financeamento";
import ModalidadesCredito from "@/components/modalidades-credito"; // importe o componente
import SolicitacoesCredito from "@/components/solicitacoes-credito";
import EditarCliente from "@/components/clientes";

type UserType = "cliente" | "adm";

export default function DashboardPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const [tipo, setTipo] = useState<UserType | null>(null);
  const [nome, setNome] = useState<string>("");
  const [boasVindas, setBoasVindas] = useState<string>("");

  useEffect(() => {
    const cpf = localStorage.getItem("cpf");
    const tipoStorage = localStorage.getItem("tipo") as UserType | null;
    const nomeStorage = localStorage.getItem("nome");

    if (!cpf || !tipoStorage || !nomeStorage) {
      router.push("/login");
      return;
    }

    setTipo(tipoStorage);
    setNome(nomeStorage);

    const hora = new Date().getHours();
    if (hora < 12) setBoasVindas("Bom dia");
    else if (hora < 18) setBoasVindas("Boa tarde");
    else setBoasVindas("Boa noite");
  }, [router]);

  if (!tipo || !nome) {
    return null;
  }

  return (
    <main
      className={cn(
        "min-h-screen p-6 transition-colors duration-300",
        theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-gray-900"
      )}
    >
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className={cn(
              "text-3xl font-bold cursor-pointer transition-colors duration-300 select-none",
              theme === "dark" ? "text-white hover:text-yellow-400" : "text-gray-900 hover:text-blue-600"
            )}
          >
            {boasVindas}, {nome}!
          </h1>
          <p
            className={cn(
              "text-sm mt-1 transition-colors duration-300 select-none",
              theme === "dark" ? "text-gray-400 hover:text-yellow-300" : "text-gray-500 hover:text-blue-400"
            )}
          >
            Painel de controle
          </p>
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger
            value="solicitacoes"
            className={cn(
              "flex items-center transition-colors duration-300 cursor-pointer select-none",
              theme === "dark"
                ? "text-gray-300 hover:text-yellow-400 focus:text-yellow-500"
                : "text-gray-700 hover:text-blue-600 focus:text-blue-700"
            )}
          >
            <PlusCircleIcon className="w-4 h-4 mr-2" /> Solicitações de Crédito
          </TabsTrigger>
          <TabsTrigger
            value="linhas"
            className={cn(
              "flex items-center transition-colors duration-300 cursor-pointer select-none",
              theme === "dark"
                ? "text-gray-300 hover:text-yellow-400 focus:text-yellow-500"
                : "text-gray-700 hover:text-blue-600 focus:text-blue-700"
            )}
          >
            <ListIcon className="w-4 h-4 mr-2" /> Linhas de Financiamento
          </TabsTrigger>
          <TabsTrigger
            value="dashboard"
            className={cn(
              "flex items-center transition-colors duration-300 cursor-pointer select-none",
              theme === "dark"
                ? "text-gray-300 hover:text-yellow-400 focus:text-yellow-500"
                : "text-gray-700 hover:text-blue-600 focus:text-blue-700"
            )}
          >
            <HomeIcon className="w-4 h-4 mr-2" /> Modalidades de crédito
          </TabsTrigger>
          {tipo === "adm" && (
            <TabsTrigger
              value="clientes"
              className={cn(
                "flex items-center transition-colors duration-300 cursor-pointer select-none",
                theme === "dark"
                  ? "text-gray-300 hover:text-yellow-400 focus:text-yellow-500"
                  : "text-gray-700 hover:text-blue-600 focus:text-blue-700"
              )}
            >
              <ChevronRightIcon className="w-4 h-4 mr-2" /> Clientes
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="dashboard">
          <ModalidadesCredito />
        </TabsContent>

        <TabsContent value="linhas">
          <LinhasFinanceamento />
        </TabsContent>
        <TabsContent value="clientes">
          <EditarCliente />
        </TabsContent>

        <TabsContent value="solicitacoes">
          <SolicitacoesCredito />
        </TabsContent>

        {tipo === "adm" && (
          <TabsContent value="clientes">
            <p
              className={cn(
                "text-center select-none transition-colors duration-300",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}
            >
              Em breve...
            </p>
          </TabsContent>
        )}
      </Tabs>
    </main>
  );
}
