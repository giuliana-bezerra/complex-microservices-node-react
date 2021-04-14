import express from 'express';
import {
  currentUser,
  signin,
  signout,
  signup,
} from '../../../controllers/user-controller';
import { signupValidator } from '../../../validators/user-validator';

const router = express.Router();
router.get('/currentuser', currentUser);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/signup', signupValidator, signup);

export { router as userRouter };
