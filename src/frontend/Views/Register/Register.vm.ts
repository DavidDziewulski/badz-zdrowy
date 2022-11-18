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

	constructor(private onMsg: (title: string, icon: SweetAlertIcon) => void) {
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

		if (this.isSaving) {
			return;
		};

		this.isTrySave = true;

		if (this.test()) {
			return;
		}

		this.isSaving = true;


		(async () => {
			const data = await fetch('user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.email,
					name: this.userName,
					password: this.password,
				}),
			})

			this.isSaving = false;

			if (!data.ok) {
				this.onMsg('Podany adress email jest już wykorzystany', 'error');
				return;
			}

			const emailData = await fetch('email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					to: this.email,
					subject: 'Rejestracja na stronie Badz-Zdrowy',
					text: '',
					html: `<a>Kliknij w link</a>`
				}),
			})

			if (!emailData.ok) {
				this.onMsg('Błąd podczas wysyłania wiadomości na adres email', 'error');
				return;
			}

			this.onMsg('Na podany adres email został wysłany link aktywacyjny', 'success');
		})();
	}
}
