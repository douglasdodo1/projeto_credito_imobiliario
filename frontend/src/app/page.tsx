"use client";
import CadastroFormulario from "@/components/cadastroFormulario";
import LoginFormulario from "@/components/login-formulario";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLoginSuccess = (cpf: string, tipo: string, nome: string) => {
    localStorage.setItem("cpf", cpf);
    localStorage.setItem("tipo", tipo);
    localStorage.setItem("nome", nome);

    router.push("/dashboard");
  };

  return (
    <main
      className={cn(
        "min-h-screen flex flex-col items-center justify-center px-4 py-8 transition-colors",
        theme === "dark" ? "bg-[#0f0f11] text-white" : "bg-white text-black"
      )}
    >
      <div
        className={cn(
          "w-full max-w-md rounded-2xl shadow-lg p-6 space-y-6 border",
          theme === "dark" ? "bg-[#1a1a1d] border-[#2e2e32]" : "bg-gray-100 border-gray-300"
        )}
      >
        <div className="flex justify-center gap-4">
          <Button
            variant={mode === "login" ? "default" : "outline"}
            onClick={() => setMode("login")}
            className={cn(
              "w-1/2 rounded-xl",
              mode === "login"
                ? "bg-white text-black hover:bg-gray-200"
                : "border-gray-600 text-white hover:bg-[#2a2a2e]"
            )}
          >
            Login
          </Button>
          <Button
            variant={mode === "register" ? "default" : "outline"}
            onClick={() => setMode("register")}
            className={cn(
              "w-1/2 rounded-xl",
              mode === "register"
                ? "bg-white text-black hover:bg-gray-200"
                : "border-gray-600 text-white hover:bg-[#2a2a2e]"
            )}
          >
            Cadastro
          </Button>
        </div>

        <div className="mt-4">
          {mode === "login" ? <LoginFormulario onLoginSuccess={handleLoginSuccess} /> : <CadastroFormulario />}
        </div>
      </div>
    </main>
  );
}
