import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../services/password';

export async function currentUser(req: Request, res: Response) {
  res.send({ currentUser: req.currentUser || null });
}

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });
  if (!existingUser) throw new BadRequestError('Invalid credentials');

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password,
  );
  if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
  );
  req.session = {
    jwt: userJwt,
  };

  return res.status(200).send(existingUser);
}

export async function signout(req: Request, res: Response) {
  req.session = null;
  res.send({});
}

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError('Email in use');

  const user = User.build({ email, password });
  await user.save();

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,
  );
  req.session = {
    jwt: userJwt,
  };

  return res.status(201).send(user);
}
