import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export async function currentUser(req: Request, res: Response) {
  res.send('Hi there!');
}

export async function signin(req: Request, res: Response) {
  res.send('Signed In!');
}

export async function signout(req: Request, res: Response) {
  res.send('Signed Out!');
}

export async function signup(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

  return res.send('Signed Up!');
}
