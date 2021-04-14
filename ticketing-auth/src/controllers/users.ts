import { Request, Response } from 'express';

export function currentUser(req: Request, res: Response) {
  res.send('Hi there!');
}

export function signin(req: Request, res: Response) {
  res.send('Sign In!');
}

export function signout(req: Request, res: Response) {
  res.send('Sign Out!');
}

export function signup(req: Request, res: Response) {
  res.send('Sign Up!');
}
