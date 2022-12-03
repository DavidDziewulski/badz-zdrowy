import { Request, Response } from 'express';
import { Diet } from "../models";

class DietController {
	diet = async (req: Request, res: Response) => {
		try {
			const kcal = req.body.kcal;

			const result = await Diet.findAll({ where: { kcal } });

			const diet = result.map(item => ({
				id: item.dataValues.id,
				kcal: item.dataValues.kcal,
				name: item.dataValues.name,
			}))

			return res.status(200).json({
				msg: 'Okej',
				ok: true,
				diet,
			});
		} catch (e) {
			return res.status(400).json({
				msg: e.message,
				ok: false,
				status: 400,
				route: '/diets',
			})
		}
	}
}

export const dietController = new DietController();
