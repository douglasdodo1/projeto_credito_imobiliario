"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AlternadorTema() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Para evitar mismatch SSR/CSR
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button variant="outline" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "☀️ Claro" : "🌙 Escuro"}
    </Button>
  );
}
