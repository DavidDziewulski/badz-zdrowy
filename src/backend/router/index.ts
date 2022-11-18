import { userEmail } from './../controlers/userEmail';
import express from 'express';
import { hook } from '../../frontend/utils';
import { userController } from '../controlers';
import { userValidator } from '../validators';

const router = express.Router();

router.post(
	'/user',
	userValidator.checkCreateUser(),
	hook.useMiddleware,
	userController.create
);

router.post(
	'/email',
	hook.useMiddleware,
	userEmail.create
);

export default router;