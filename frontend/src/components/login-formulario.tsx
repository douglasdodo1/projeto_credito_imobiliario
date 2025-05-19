"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { Form as ShadcnForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientEntradaDto } from "@/app/dtos/cliente.dto";

const loginSchema = z.object({
  cpf: z.string().min(11, "CPF deve ter pelo menos 11 dígitos").regex(/^\d+$/, "CPF deve conter apenas números"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormularioProps {
  onLoginSuccess: (cpf: string, tipo: string, nome: string) => void;
}

export default function LoginFormulario({ onLoginSuccess }: LoginFormularioProps) {
  const { theme } = useTheme();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { cpf: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data: cliente } = await axios.get<ClientEntradaDto>(`http://localhost:3000/clientes/${values.cpf}`);

      if (!cliente) {
        form.setError("cpf", { message: "CPF não encontrado." });
        return;
      }

      if (cliente.tipo !== "cliente" && cliente.tipo !== "adm") {
        form.setError("cpf", { message: "Tipo inválido." });
        return;
      }

      // Chama a função passada via prop para tratar o login com sucesso
      onLoginSuccess(cliente.cpf, cliente.tipo, cliente.nome);
    } catch (err) {
      console.error("Erro na requisição:", err);
      form.setError("cpf", {
        message: "Erro ao tentar logar. Verifique o CPF.",
      });
    }
  };

  return (
    <ShadcnForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn("font-medium", theme === "dark" ? "text-white" : "text-black")}>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu CPF"
                  className={cn(
                    "w-full px-3 py-2 rounded-md shadow-sm border",
                    theme === "dark"
                      ? "bg-zinc-800 text-white border-zinc-700 placeholder-gray-400"
                      : "bg-white text-black border-gray-300 placeholder-gray-500"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage className={cn(theme === "dark" ? "text-red-400" : "text-red-600")} />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={cn(
            "w-full font-semibold transition-colors",
            theme === "dark"
              ? "bg-blue-400 hover:bg-blue-500 text-gray-900"
              : "bg-blue-700 hover:bg-blue-800 text-white"
          )}
        >
          Entrar
        </Button>
      </form>
    </ShadcnForm>
  );
}
