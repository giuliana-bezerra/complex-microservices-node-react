import {
  signin,
  signout,
  signup,
  currentUser,
} from '../../../controllers/users';

const router = require('express').Router();

router.get('/currentuser', currentUser);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/signup', signup);

export { router as userRouter };
