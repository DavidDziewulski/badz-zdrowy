import { Request, Response } from 'express';
import { User } from "../models";

class UserController {
	async create(req: Request, res: Response) {
		try {
			await User.create({ ...req.body })
			return res.json({ msg: 'Successfully create user' })
		} catch (e) {
			return res.status(500).json({ msg: "fail to create", status: 500, route: '/user' })
		}
	}
}

export const userController = new UserController();