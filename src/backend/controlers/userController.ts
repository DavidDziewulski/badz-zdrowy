import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { API_KEY } from '../../Global';
import { Diet, User } from "../models";

class UserController {
	public sendEmail = async (to: string, token: string) => {
		const mailData = {
			from: 'badz-zdrowy@badz-zdrowy.pl',
			to,
			subject: 'Rejestracja na poratlu Bądź Zdrowy',
			text: 'text',
			html: `<p>Klinkij
						<a href="http://localhost:3000/confirm?id=${token}">
							tutaj
						</a> aby zatwierdzić konto
				</p>`,
		};

		createTransport({
			service: 'Sendinblue',
			auth: {
				user: 'nesti638@gmail.com',
				pass: API_KEY,
			},
		}).sendMail(mailData);
	}

	create = async (req: Request, res: Response) => {
		try {
			const token = uuidv4();

			await this.sendEmail(req.body.email, token);

			await User.create({ ...req.body, tokenId: token, dietId: 1 }) //here

			if (res.statusCode)
				return res.json({ msg: 'Successfully create user', ok: true })
		} catch (e) {
			return res.status(500).json({
				msg: 'Error',
				status: 500,
				route: '/user',
				ok: false,
			})
		}
	}

	verify = async (req: Request, res: Response) => {
		try {
			const result = await User.findOne({
				where: {
					tokenId: (req.query.id as string)
				}
			})

			if (!result.dataValues.isActive) {
				await result.update({ isActive: true })
					.catch(e => e)
			}

			res.redirect('/log-in')
		} catch (e) {
			return res.status(500).json({
				msg: 'Error email',
				status: 500,
				route: '/user',
				ok: false,
			})
		}
	}

	diet = async (req: Request, res: Response) => {
		try {
			const dietId = req.body.dietId;

			const result = await Diet.findOne({ where: { id: dietId } });

			if (!result) {
				throw new Error("Nie ma takiej diety")
			}

			return res.status(200).json({
				msg: 'Okej',
				ok: true,
				diet: {
					id: result.dataValues.id,
					kcal: result.dataValues.kcal,
					data: JSON.parse(result.dataValues.data),
				}
			});
		} catch (e) {
			return res.status(400).json({
				msg: e.message,
				ok: false,
				status: 400,
				route: '/diet',
			})
		}
	}

	logIn = async (req: Request, res: Response) => {
		try {
			const email = req.body.email;

			const result = await User.findOne({ where: { email } });

			if (!result) {
				throw new Error("Nie ma takiego użytkownika")
			}

			if (!await bcrypt.compare(req.body.password, result.dataValues.password)) {
				throw new Error("Niepoprawne hasło")
			}

			if (!result.dataValues.isActive) {
				throw new Error("Konto nie jest aktywne, sprawdź email")
			}

			return res.status(200).json({
				msg: 'Okej',
				ok: true,
				user: {
					name: result.dataValues.name,
					email,
					dietId: result.dataValues.dietId,
				}
			});
		} catch (e) {
			return res.status(400).json({
				msg: e.message,
				ok: false,
				status: 400,
				route: '/log-in',
			})
		}
	}
}

export const userController = new UserController();
