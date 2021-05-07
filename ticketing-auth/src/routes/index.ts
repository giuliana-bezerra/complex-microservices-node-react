import 'express-async-errors';
import { NotFoundError } from '../errors/not-found-error';
import { errorHandler } from '../middlewares/error-handler';
import { apiRouter } from './api';
const router = require('express').Router();

router.use('/api', apiRouter);
router.all('*', async () => {
  throw new NotFoundError();
});
router.use(errorHandler);

export { router as routes };
