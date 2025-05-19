"use client";

import { useState } from "react";
import axios from "axios";
import { ClientEntradaDto } from "../dtos/cliente.dto";

import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { Form, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CadastroFormulario() {
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const form = useForm<ClientEntradaDto>({
    defaultValues: {
      cpf: "",
      tipo: "cliente",
      nome: "",
      idade: 0,
      renda: 0,
    },
  });

  const onSubmit = async (data: ClientEntradaDto) => {
    setLoading(true);
    setMensagem("");
    try {
      await axios.post("http://localhost:3000/clientes", data);
      setMensagem("Cadastro realizado com sucesso!");
      form.reset();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  // Classes para inputs e selects, condicionais de tema
  const inputClass = cn(
    "transition-colors",
    theme === "dark"
      ? "bg-zinc-800 text-white border border-zinc-700 placeholder-gray-400"
      : "bg-white text-black border border-gray-300 placeholder-gray-500"
  );

  const selectClass = cn(
    "transition-colors",
    theme === "dark" ? "bg-zinc-800 text-white border border-zinc-700" : "bg-white text-black border border-gray-300"
  );

  const messageClass = cn(
    "mt-2 text-center text-sm transition-colors",
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  );

  const buttonClass = cn(
    "w-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
    theme === "dark"
      ? "bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-500 text-gray-900 hover:bg-blue-500"
      : "bg-blue-700 text-white hover:bg-blue-800"
  );

  return (
    <div
      className={cn(
        "max-w-md w-full p-4 rounded shadow transition-colors",
        theme === "dark" ? "bg-[#1a1a1d] text-white" : "bg-white text-black"
      )}
    >
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* CPF */}
          <FormItem>
            <FormLabel className={theme === "dark" ? "text-white" : "text-black"}>CPF</FormLabel>
            <FormControl>
              <Input {...form.register("cpf", { required: true })} placeholder="CPF" className={inputClass} />
            </FormControl>
          </FormItem>

          {/* Tipo */}
          <FormItem>
            <FormLabel className={theme === "dark" ? "text-white" : "text-black"}>Tipo</FormLabel>
            <FormControl>
              <Select onValueChange={(value) => form.setValue("tipo", value)} value={form.watch("tipo")}>
                <SelectTrigger className={selectClass}>
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="adm">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Nome */}
          <FormItem>
            <FormLabel className={theme === "dark" ? "text-white" : "text-black"}>Nome</FormLabel>
            <FormControl>
              <Input {...form.register("nome", { required: true })} placeholder="Nome" className={inputClass} />
            </FormControl>
          </FormItem>

          {/* Idade */}
          <FormItem>
            <FormLabel className={theme === "dark" ? "text-white" : "text-black"}>Idade</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...form.register("idade", {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                })}
                placeholder="Idade"
                className={inputClass}
              />
            </FormControl>
          </FormItem>

          {/* Renda */}
          <FormItem>
            <FormLabel className={theme === "dark" ? "text-white" : "text-black"}>Renda</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...form.register("renda", {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                })}
                placeholder="Renda"
                className={inputClass}
              />
            </FormControl>
          </FormItem>

          <Button type="submit" className={buttonClass} disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
      </Form>

      {mensagem && <p className={messageClass}>{mensagem}</p>}
    </div>
  );
}
