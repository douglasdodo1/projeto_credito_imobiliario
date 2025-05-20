"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Form as ShadcnForm, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { ModalidadeCreditoDto } from "@/app/dtos/modalidadeCredito.dto";

const modalidadeSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  tipoJuros: z.string().min(1, "Tipo de juros é obrigatório"),
  taxaJuros: z
    .number({
      invalid_type_error: "Taxa de juros deve ser um número",
      required_error: "Taxa de juros é obrigatória",
    })
    .nonnegative("Taxa de juros deve ser positiva"),
  taxaAdministracao: z.number().nonnegative("Taxa de administração deve ser positiva").nullable().optional(),
  idadeMinima: z
    .number({
      invalid_type_error: "Idade mínima deve ser um número",
      required_error: "Idade mínima é obrigatória",
    })
    .int("Idade mínima deve ser inteiro")
    .nonnegative("Idade mínima não pode ser negativa"),
  idadeMaxima: z
    .number({
      invalid_type_error: "Idade máxima deve ser um número",
      required_error: "Idade máxima é obrigatória",
    })
    .int("Idade máxima deve ser inteiro")
    .nonnegative("Idade máxima não pode ser negativa"),
  rendaMinima: z.number().nullable().optional(),
  rendaMaxima: z.number().nullable().optional(),
  prazoAnos: z
    .number({
      invalid_type_error: "Prazo deve ser um número",
      required_error: "Prazo é obrigatório",
    })
    .int("Prazo deve ser inteiro")
    .nonnegative("Prazo não pode ser negativo"),
  ativo: z.boolean().optional(),
});

type ModalidadeFormValues = z.infer<typeof modalidadeSchema>;

export default function ModalidadesCredito() {
  const { theme } = useTheme();
  const [modalidades, setModalidades] = useState<ModalidadeCreditoDto[]>([]);
  const [tipo, setTipo] = useState<string | null>(null);

  const form = useForm<ModalidadeFormValues>({
    resolver: zodResolver(modalidadeSchema),
    defaultValues: {
      nome: "",
      tipoJuros: "",
      taxaJuros: 0,
      taxaAdministracao: null,
      idadeMinima: 0,
      idadeMaxima: 0,
      rendaMinima: null,
      rendaMaxima: null,
      prazoAnos: 0,
      ativo: true,
    },
  });

  useEffect(() => {
    const tipoUser = localStorage.getItem("tipo");
    setTipo(tipoUser);
    fetchModalidades();
  }, []);

  const fetchModalidades = async () => {
    try {
      const { data } = await axios.get<ModalidadeCreditoDto[]>("http://localhost:3000/modalidades-credito");
      setModalidades(data);
    } catch (err) {
      console.error("Erro ao buscar modalidades:", err);
    }
  };

  const onSubmit = async (values: ModalidadeFormValues) => {
    try {
      await axios.post("http://localhost:3000/modalidades-credito", values);
      form.reset();
      fetchModalidades();
    } catch (err) {
      console.error("Erro ao cadastrar modalidade:", err);
    }
  };

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
    <div className={cn("space-y-8 max-w-7xl mx-auto", theme === "dark" ? "text-white" : "text-gray-900")}>
      <h2
        className={cn(
          "text-3xl font-extrabold border-b-2 pb-2 mb-6",
          theme === "dark" ? "border-indigo-600" : "border-blue-600"
        )}
      >
        Modalidades de Crédito
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
              {[
                "Nome",
                "Tipo Juros",
                "Taxa Juros (%)",
                "Taxa Adm. (%)",
                "Idade Mín.",
                "Idade Máx.",
                "Renda Mín. (R$)",
                "Renda Máx. (R$)",
                "Prazo (anos)",
                "Ativo",
              ].map((header) => (
                <TableHead key={header} className={cn("py-3 px-3", theme === "dark" ? "text-white" : "text-blue-900")}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {modalidades.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className={cn(
                    "text-center py-6",
                    theme === "dark" ? "text-gray-500 dark:text-gray-400" : "text-blue-600"
                  )}
                >
                  Nenhuma modalidade cadastrada.
                </TableCell>
              </TableRow>
            ) : (
              modalidades.map((modalidade, idx) => (
                <TableRow key={modalidade.id ?? idx} className={idx % 2 === 0 ? linhaParClass : ""}>
                  <TableCell className="py-2 px-3">{modalidade.nome}</TableCell>
                  <TableCell className="py-2 px-3">{modalidade.tipoJuros}</TableCell>
                  <TableCell className="py-2 px-3">{modalidade.taxaJuros?.toFixed(2) ?? "-"}</TableCell>
                  <TableCell className="py-2 px-3">
                    {modalidade.taxaAdministracao != null ? modalidade.taxaAdministracao.toFixed(2) : "-"}
                  </TableCell>
                  <TableCell className="py-2 px-3">{modalidade.idadeMinima}</TableCell>
                  <TableCell className="py-2 px-3">{modalidade.idadeMaxima}</TableCell>
                  <TableCell className="py-2 px-3">
                    {modalidade.rendaMinima != null ? modalidade.rendaMinima.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell className="py-2 px-3">
                    {modalidade.rendaMaxima != null ? modalidade.rendaMaxima.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell className="py-2 px-3">{modalidade.prazoAnos}</TableCell>
                  <TableCell className="py-2 px-3">{modalidade.ativo ? "Sim" : "Não"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {tipo === "adm" && (
        <div className={formContainerClass}>
          <h3 className={tituloFormClass}>Cadastrar Nova Modalidade</h3>
          <ShadcnForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormLabel className={labelClass}>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Financiamento Habitacional"
                    {...form.register("nome")}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Tipo de Juros</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Prefixado, Pós-fixado"
                    {...form.register("tipoJuros")}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Taxa de Juros (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register("taxaJuros", { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Taxa de Administração (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register("taxaAdministracao", { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Idade Mínima</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...form.register("idadeMinima", { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Idade Máxima</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...form.register("idadeMaxima", { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Renda Mínima (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register("rendaMinima", { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Renda Máxima (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...form.register("rendaMaxima", { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <FormLabel className={labelClass}>Prazo (anos)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...form.register("prazoAnos", { valueAsNumber: true })}
                    className={inputClass}
                  />
                </FormControl>
                <FormMessage className={msgErroClass} />
              </FormItem>

              <FormItem>
                <Controller
                  control={form.control}
                  name="ativo"
                  render={({ field }) => (
                    <FormControl>
                      <div className="flex items-center">
                        <Checkbox checked={field.value ?? true} onCheckedChange={field.onChange} id="ativo" />
                        <FormLabel htmlFor="ativo" className={cn(labelClass, "ml-2")}>
                          Ativo
                        </FormLabel>
                      </div>
                    </FormControl>
                  )}
                />
              </FormItem>

              <Button type="submit" className={buttonClass}>
                Cadastrar
              </Button>
            </form>
          </ShadcnForm>
        </div>
      )}
    </div>
  );
}
