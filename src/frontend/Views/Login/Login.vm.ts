import { makeAutoObservable, runInAction } from 'mobx';

export class LoginVm {
	email = '';

	password = '';

	emailErrorMessage?: string = undefined;

	passwordErrorMessage?: string = undefined;

	isSaving = false;

	constructor() {
		makeAutoObservable(this);
	}

	mount = async () => {
		const { result } = await fetch(`http://localhost:3000/employees/10`)
			.then(data => data.json())
			.catch((error) => {
				console.error('Error:', error);
				return;
			});

		if (!result) {
			return;
		}

		console.log(result)

		runInAction(() => {
			this.email = result.title;
		})
	}

	setEmail = (value: string) => {
		this.email = value;
	};

	setPassword = (value: string) => {
		this.password = value;
	};

	save = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (this.isSaving) {
			return;
		}

		this.isSaving = true;

		this.emailErrorMessage = 'Nie znaleziono konta na podany adres email.'

		this.passwordErrorMessage = 'Błędne hasło.'

		this.isSaving = false;
	}
}