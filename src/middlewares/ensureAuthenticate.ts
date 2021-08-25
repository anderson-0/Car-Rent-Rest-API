import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "src/errors/AppError";
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

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, "secret") as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError("User does not exists", 401);

    req.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
