import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("Erro capturado:", err);

  const status = err.statusCode || 500;
  const message = err.message || "Erro interno do servidor.";

  res.status(status).json({
    sucesso: false,
    mensagem: message,
    detalhes: err.details || null,
  });
}
