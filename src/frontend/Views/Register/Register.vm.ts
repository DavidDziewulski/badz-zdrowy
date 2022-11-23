import { user } from './../../store/user';
import { makeAutoObservable } from 'mobx';
import { SweetAlertIcon } from 'sweetalert2';
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

	constructor(private onMsg: (title: string, icon: SweetAlertIcon, isError: boolean) => void) {
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
		if (this.isSaving) {
			return;
		};

		e.preventDefault();

		this.isTrySave = true;

		if (this.test()) {
			return;
		}

		this.isSaving = true;
		(async () => {
			const result = await user.register(
				this.email,
				this.userName,
				this.password,
			);

			this.isSaving = false;

			if (!result) {
				this.onMsg(`Na podany adres został już wysłany link aktywacyjyn, proszę sprawdź email bądź załóż konto na inny adres email`, 'error', true);
				return;
			};

			this.onMsg('Na podany adres email został wysłany link aktywacyjny', 'success', false);
		})();
	}
}
