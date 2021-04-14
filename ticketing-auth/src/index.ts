import express from 'express';
import { json } from 'body-parser';
import { routes } from './routes';

const app = express();
app.use(json());
app.use(routes);

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
