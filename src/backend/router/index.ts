import express from 'express';
import { hook } from '../../frontend/utils';
import { dietController, userController } from '../controlers';
import { userValidator } from '../validators';

const router = express.Router();

router.post(
	'/api/user',
	userValidator.checkCreateUser(),
	hook.useMiddleware,
	userController.create,
);

router.get(
	'/api/confirm',
	hook.useMiddleware,
	userController.verify,
)

router.post(
	'/api/diet',
	hook.useMiddleware,
	userController.diet,
)

router.post(
	'/api/log-in',
	userValidator.checkLoginUser(),
	hook.useMiddleware,
	userController.logIn,
)

router.post(
	'/api/diets',
	hook.useMiddleware,
	dietController.diet,
)

export default router;
