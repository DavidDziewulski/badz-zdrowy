import express from 'express';
import { hook } from '../../frontend/utils';
import { dietController, userController } from '../controlers';
import { userValidator } from '../validators';

const router = express.Router();

router.post(
	'/user',
	userValidator.checkCreateUser(),
	hook.useMiddleware,
	userController.create,
);

router.get(
	'/confirm',
	hook.useMiddleware,
	userController.verify,
)

router.post(
	'/diet',
	hook.useMiddleware,
	userController.diet,
)

router.post(
	'/log-in',
	userValidator.checkLoginUser(),
	hook.useMiddleware,
	userController.logIn,
)

router.post(
	'/app/diets',
	hook.useMiddleware,
	dietController.diet,
)

export default router;
