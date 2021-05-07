import { json } from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { routes } from './routes';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);
app.use(routes);

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

  await mongoose
    .connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((_) => console.log('Connected to MongoDb'))
    .catch(console.error);

  app.listen(3000, () => {
    console.log('Listening on port 3000...');
  });
};

start();
