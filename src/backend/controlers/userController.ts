import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createTransport } from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { API_KEY } from '../../Global';
import { User } from "../models";

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

			await User.create({ ...req.body, tokenId: token })

			if (res.statusCode)
				return res.json({ msg: 'Successfully create user', ok: true })
		} catch (e) {
			console.log(e);
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
			console.log(req.query.id)

			const result = await User.findOne({ where: { tokenId: (req.query.id as string) } })

			if (!result.dataValues.isActive) {
				await result.update({ isActive: true }).catch(e => console.log(e))
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

			res.status(200).json({
				msg: 'Okej',
				ok: true,
				user: {
					name: result.dataValues.name,
					email,
				}
			});
		} catch (e) {
			if (e instanceof Error) {
				return res.status(400).json({
					msg: e.message,
					ok: false,
					status: 400,
					route: '/log-in',
				})
			}

			return res.status(500).json({
				msg: "Error",
				ok: false,
				status: 500,
				route: '/log-in',
			})
		}
	}
}

export const userController = new UserController();