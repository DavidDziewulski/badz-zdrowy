import { makeAutoObservable } from 'mobx';
import { utils } from '../../utils';

export class RegisterVm {
	userName = '';

	email = '';

	password = '';

	isAccept = false;

	isSaving = false;

	error = {
		userName: true,
		email: true,
		password: true,
		accept: true,
	}

	isTrySave = false;

	constructor() {
		makeAutoObservable(this);
	}

	setUserName = (name: string) => {
		this.userName = name;


		this.error.userName = !utils.userNameValidation(name);
	};

	setEmail = (email: string) => {
		this.email = email;

		this.error.email = !utils.emailValidation(email);
	};

	setPassword = (password: string) => {
		this.password = password;

		this.error.password = !utils.passwordValidation(password);
	};

	setAccept = () => {
		this.isAccept = !this.isAccept;

		this.error.accept = !this.isAccept;
	};

	test = () => [
		this.error.userName,
		this.error.email,
		this.error.password,
		this.error.accept,
	].includes(true);


	save = (e: React.SyntheticEvent) => {
		e.preventDefault();

		this.isTrySave = true;

		if (this.test()) {
			return;
		}

		if (this.isSaving) {
			return;
		};

		this.isSaving = true;

		this.isSaving = false;
	};
}