// src/utils/catchAsync.ts
import { Request, Response, NextFunction } from "express";

export function catchAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
