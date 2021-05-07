import express from 'express';
import {
  currentUser,
  signin,
  signout,
  signup,
} from '../../../controllers/user-controller';
import { currentUser as currentUserMiddleware } from '../../../middlewares/current-user';
import { requireAuth } from '../../../middlewares/require-auth';
import { validateRequest } from '../../../middlewares/validate-request';
import {
  signinValidator,
  signupValidator,
} from '../../../validators/user-validator';

const router = express.Router();
router.get('/currentuser', currentUserMiddleware, currentUser);
router.post('/signin', signinValidator, validateRequest, signin);
router.post('/signout', signout);
router.post('/signup', signupValidator, validateRequest, signup);

export { router as userRouter };
