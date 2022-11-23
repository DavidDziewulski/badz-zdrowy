import { makeAutoObservable } from 'mobx';

class Store {
	isActive = false;

	name = '';

	email = '';

	constructor() {
		makeAutoObservable(this);

		this.loadUser();
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
		}).then((result) => result.json()).then(result => {
			if (!result.ok) {
				return result
			};

			this.setUser(result.user.email, result.user.name)

			return result
		}).catch(e => e);
	}

	loadUser = () => {
		const json = window.localStorage.getItem('currentUser');

		if (!json) {
			return;
		}

		const { email, name } = JSON.parse(json);

		this.setUser(email, name)
	}

	logOut = () => {
		console.log('dupa')
		window.localStorage.removeItem('currentUser');

		this.isActive = false;
	}


	setUser = (email: string, name: string) => {
		window.localStorage.setItem('currentUser', JSON.stringify({
			email,
			name,
		}));

		this.email = email;

		this.name = name;

		this.isActive = true;
	}
}

export const store = new Store();
