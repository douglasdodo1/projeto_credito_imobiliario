"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Form as ShadcnForm, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";

// Schema para validação do formulário
const linhaSchema = z.object({
  tipoImovel: z.string().min(1, "Tipo de imóvel é obrigatório"),
  criterioElegibilidade: z.string().min(1, "Critério de elegibilidade é obrigatório"),
});

type LinhaFormValues = z.infer<typeof linhaSchema>;

export default function LinhasFinanceamento() {
  const { theme } = useTheme();
  const [linhas, setLinhas] = useState<LinhaFormValues[]>([]);
  const [tipo, setTipo] = useState<string | null>(null);

  const form = useForm<LinhaFormValues>({
    resolver: zodResolver(linhaSchema),
    defaultValues: { tipoImovel: "", criterioElegibilidade: "" },
  });

  useEffect(() => {
    const tipoUser = localStorage.getItem("tipo");
    setTipo(tipoUser);
    fetchLinhas();
  }, []);

  const fetchLinhas = async () => {
    try {
      const { data } = await axios.get<LinhaFormValues[]>("http://localhost:3000/linhas-financeamento");
      setLinhas(data);
    } catch (err) {
      console.error("Erro ao buscar linhas:", err);
    }
  };

  const onSubmit = async (values: LinhaFormValues) => {
    try {
      await axios.post("http://localhost:3000/linhas-financeamento", values);
      form.reset();
      fetchLinhas();
    } catch (err) {
      console.error("Erro ao cadastrar linha:", err);
    }
  };

  // Estilos condicionalmente baseados no tema
  const tabelaCabecalhoClass = theme === "dark" ? "bg-indigo-600 text-white" : "bg-blue-200 text-blue-900";

  const linhaParClass = theme === "dark" ? "bg-gray-50 dark:bg-gray-800" : "bg-blue-50";

  const formContainerClass =
    theme === "dark"
      ? "p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
      : "p-6 bg-white rounded-lg shadow-md border border-blue-200";

  const tituloFormClass =
    theme === "dark" ? "text-2xl font-semibold mb-4 text-indigo-600" : "text-2xl font-semibold mb-4 text-blue-700";

  const labelClass = theme === "dark" ? "font-medium text-gray-700 dark:text-gray-300" : "font-medium text-blue-900";

  const inputClass =
    theme === "dark" ? "border-indigo-600 focus:ring-indigo-600" : "border-blue-400 focus:ring-blue-500";

  const buttonClass =
    theme === "dark"
      ? "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold w-full py-3 rounded-md transition-colors duration-200"
      : "bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-3 rounded-md transition-colors duration-200";

  const msgErroClass = theme === "dark" ? "text-red-600 dark:text-red-400" : "text-red-700";

  return (
    <div className={cn("space-y-8 max-w-5xl mx-auto", theme === "dark" ? "text-white" : "text-gray-900")}>
      <h2
        className={cn(
          "text-3xl font-extrabold border-b-2 pb-2 mb-6",
          theme === "dark" ? "border-indigo-600" : "border-blue-600"
        )}
      >
        Linhas de Financiamento
      </h2>

      <div
        className={cn(
          "overflow-x-auto rounded-lg shadow-lg border",
          theme === "dark" ? "border-gray-200 dark:border-gray-700" : "border-blue-300"
        )}
      >
        <Table>
          <TableHeader className={tabelaCabecalhoClass}>
            <TableRow>
              <TableHead className="py-3 px-6">Tipo de Imóvel</TableHead>
              <TableHead className="py-3 px-6">Critério de Elegibilidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {linhas.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className={cn(
                    "text-center py-6",
                    theme === "dark" ? "text-gray-500 dark:text-gray-400" : "text-blue-600"
                  )}
                >
                  Nenhuma linha cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              linhas.map((linha, idx) => (
                <TableRow key={idx} className={idx % 2 === 0 ? linhaParClass : ""}>
                  <TableCell className="py-3 px-6">{linha.tipoImovel}</TableCell>
                  <TableCell className="py-3 px-6">{linha.criterioElegibilidade}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {tipo === "adm" && (
        <div className={formContainerClass}>
          <h3 className={tituloFormClass}>Cadastrar Nova Linha</h3>
          <ShadcnForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormItem>
                <FormLabel className={labelClass}>Tipo de Imóvel</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Residencial" {...form.register("tipoImovel")} className={inputClass} />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Critério de Elegibilidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Renda mínima"
                    {...form.register("criterioElegibilidade")}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <Button type="submit" className={buttonClass}>
                Adicionar Linha
              </Button>
            </form>
          </ShadcnForm>
        </div>
      )}
    </div>
  );
}
