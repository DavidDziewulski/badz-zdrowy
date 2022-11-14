import { makeAutoObservable } from 'mobx';

export class LoginVm {
	email = '';

	password = '';

	emailErrorMessage?: string = undefined;

	passwordErrorMessage?: string = undefined;

	isSaving = false;

	constructor() {
		makeAutoObservable(this);
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