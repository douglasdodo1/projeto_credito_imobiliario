import { AlternadorTema } from "./alternador-tema";

export function Footer() {
  return (
    <footer className="w-full p-4 border-t mt-auto flex justify-between items-center bg-background text-muted-foreground">
      <span>© {new Date().getFullYear()} Minha Aplicação</span>
      <AlternadorTema />
    </footer>
  );
}
