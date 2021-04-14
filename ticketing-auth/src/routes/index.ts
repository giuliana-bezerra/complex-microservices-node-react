import { apiRouter } from './api';
const router = require('express').Router();

router.use('/api', apiRouter);

export { router as routes };
