import { makeAutoObservable } from 'mobx';
import { SweetAlertIcon } from 'sweetalert2';
import { utils } from '../../utils';
import { store } from '../../store';

export class LoginVm {
	email = '';

	password = '';

	emailErrorMessage?: string = undefined;

	passwordErrorMessage?: string = undefined;

	isSaving = false;

	error = {
		email: true,
		password: true,
	}

	isTrySave = false;

	constructor(private onMsg: (title: string, icon: SweetAlertIcon, isError: boolean) => void) {
		makeAutoObservable(this);
	}

	setEmail = (email: string) => {
		this.email = email;

		this.error.email = !utils.emailValidation(email);
	};

	setPassword = (password: string) => {
		this.password = password;

		this.error.password = !utils.passwordValidation(password);
	};

	test = () => [
		this.error.email,
		this.error.password,
	].includes(true);

	save = (e: React.SyntheticEvent) => {
		if (this.isSaving) {
			return;
		}

		e.preventDefault();

		this.isTrySave = true;

		if (this.test()) {
			return;
		}

		this.isSaving = true;

		(async () => {
			const result = await store.user.login(
				this.email,
				this.password,
			);

			if (!result.ok) {
				if (result.msg) {
					this.onMsg(`${result.msg}`, 'error', true);

					this.isSaving = false;

					return;
				}

				this.onMsg(`${result.errors[0].msg}`, 'error', true);

				this.isSaving = false;

				return;
			}

			this.isSaving = false;
		}
		)()
	}
}
