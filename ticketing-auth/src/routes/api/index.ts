import { userRouter } from './users';

const router = require('express').Router();

router.use('/users', userRouter);

export { router as apiRouter };
