import { Request, Response } from 'express';
import { Article } from '../models/article';

class ArticleController {
	articles = async (req: Request, res: Response) => {
		try {
			const data = await Article.findAll();

			return res.status(200).json({
				msg: 'Okej',
				ok: true,
				data,
			});

		} catch (e) {
			return res.status(400).json({
				msg: e.message,
				ok: false,
				status: 400,
				route: '/articles',
			})
		}
	}
}

export const articleController = new ArticleController();
