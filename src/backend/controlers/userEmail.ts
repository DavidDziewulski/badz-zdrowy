import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import { API_KEY } from './../../Global/index';


class UserEmail {
	async create(req: Request, res: Response) {
		const { to, subject, text, html } = req.body;

		const mailData = {
			from: 'badz-zdrowy@badz-zdrowy.pl',
			to,
			subject,
			text,
			html,
		};

		createTransport({
			service: 'Sendinblue',
			auth: {
				user: 'nesti638@gmail.com',
				pass: API_KEY,
			}
		})
			.sendMail(mailData, error => {
				if (error) {
					console.log(error);
					return res.status(500).json({
						msg: "fail to send email",
						status: 500, route: '/email'
					})
				}

				return res.json({ msg: 'Successfully create user' })
			})
	}
}

export const userEmail = new UserEmail();