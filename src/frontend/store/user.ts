import { makeAutoObservable } from 'mobx';
import { User as UserModel } from './../models'

class User {
	user?: UserModel;

	constructor() {
		makeAutoObservable(this);
	}

	register = async (email: string, name: string, password: string) => {
		const result = await fetch('user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				name,
				password,
			}),
		})

		return result.ok
	}

	login = async (email: string, password: string) => {
		return await fetch('log-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		}).then(result => result.json()).catch(e => e);
	}

	get currentUser() {
		if (!user) {
			const current = JSON.parse(window.localStorage.getItem('user1'))
			this.user = new UserModel(current.email, current.name);
		}

		return this.user;
	}

}

export const user = new User();