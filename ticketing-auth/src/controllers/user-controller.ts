import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function currentUser(req: Request, res: Response) {
  res.send('Hi there!');
}

export function signin(req: Request, res: Response) {
  res.send('Signed In!');
}

export function signout(req: Request, res: Response) {
  res.send('Signed Out!');
}

export function signup(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).send(errors.array());

  return res.send('Signed Up!');
}
