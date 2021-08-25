import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "src/modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new Error("Token missing");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "secret") as IPayload;
    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);
  } catch (error) {
    throw new Error("Invalid Token");
  }

  next();
}
