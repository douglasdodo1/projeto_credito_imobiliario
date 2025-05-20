// components/EditarClienteModal.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form as ShadcnForm, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import axios from "axios";
import { ClientEntradaDto } from "@/app/dtos/cliente.dto";

const clientSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  idade: z.coerce.number().min(18, "Idade mínima é 18 anos"),
  renda: z.coerce.number().min(0, "Renda não pode ser negativa"),
  tipo: z.string().min(1, "Tipo é obrigatório"),
});

type ClientFormValues = z.infer<typeof clientSchema>;

interface EditarClienteModalProps {
  cliente: ClientEntradaDto | null;
  open: boolean;
  onClose: () => void;
  onAtualizar: () => void;
}

export function EditarClienteModal({ cliente, open, onClose, onAtualizar }: EditarClienteModalProps) {
  const { theme } = useTheme();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      nome: cliente?.nome || "",
      idade: cliente?.idade || 0,
      renda: cliente?.renda || 0,
      tipo: cliente?.tipo || "",
    },
    values: {
      nome: cliente?.nome || "",
      idade: cliente?.idade || 0,
      renda: cliente?.renda || 0,
      tipo: cliente?.tipo || "",
    },
  });

  const inputClass = theme === "dark" ? "border-zinc-600 focus:ring-zinc-600" : "border-blue-400 focus:ring-blue-500";
  const labelClass = theme === "dark" ? "font-medium text-zinc-200" : "font-medium text-blue-900";
  const msgErroClass = theme === "dark" ? "text-red-600" : "text-red-700";
  const buttonClass =
    theme === "dark"
      ? "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md"
      : "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md";

  const onSubmit = async (data: ClientFormValues) => {
    if (!cliente) return;

    try {
      await axios.put(`http://localhost:3000/clientes/${cliente.cpf}`, data);
      onAtualizar();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar cliente:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Cliente</DialogTitle>
        </DialogHeader>

        <ShadcnForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormItem>
              <FormLabel className={labelClass}>Nome</FormLabel>
              <FormControl>
                <Input className={cn("w-full", inputClass)} {...form.register("nome")} />
              </FormControl>
              <FormMessage className={msgErroClass} />
            </FormItem>

            <FormItem>
              <FormLabel className={labelClass}>Idade</FormLabel>
              <FormControl>
                <Input type="number" className={cn("w-full", inputClass)} {...form.register("idade")} />
              </FormControl>
              <FormMessage className={msgErroClass} />
            </FormItem>

            <FormItem>
              <FormLabel className={labelClass}>Renda</FormLabel>
              <FormControl>
                <Input type="number" className={cn("w-full", inputClass)} {...form.register("renda")} />
              </FormControl>
              <FormMessage className={msgErroClass} />
            </FormItem>

            <FormItem>
              <FormLabel className={labelClass}>Tipo</FormLabel>
              <FormControl>
                <Input className={cn("w-full", inputClass)} {...form.register("tipo")} />
              </FormControl>
              <FormMessage className={msgErroClass} />
            </FormItem>

            <div className="flex justify-end gap-4 mt-4">
              <Button type="button" onClick={onClose} variant="outline">
                Cancelar
              </Button>
              <Button type="submit" className={buttonClass}>
                Salvar
              </Button>
            </div>
          </form>
        </ShadcnForm>
      </DialogContent>
    </Dialog>
  );
}
