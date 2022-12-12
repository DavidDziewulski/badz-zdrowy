import { observer } from "mobx-react";
import { Link, useNavigate } from "react-router-dom";
import { SweetAlertIcon } from "sweetalert2";
import { ErrorMessage } from "../../components";
import { hook } from "../../utils";
import { RegisterVm } from "./Register.vm";

export const Register = observer(() => {
	const navigate = useNavigate();

	const vm = hook.useVm(() => new RegisterVm((
		title: string,
		icon: SweetAlertIcon,
		isError: boolean
	) => {
		hook.useAlert().fire({
			title: <p>{title}</p>,
			icon,
		}).then(() => {
			if (isError) {
				return;
			}

			navigate('/log-in')
		})
	}));

	const nameError = vm.error.userName && vm.isTrySave && (
		<ErrorMessage message="Proszę podać poprawnę imię" />
	)

	const emailError = vm.error.email && vm.isTrySave && (
		<ErrorMessage message="Proszę wpisać poprwany adres email. Przykładowy email: nazwa@gmail.com" />
	)

	const passwordError = vm.error.password && vm.isTrySave && (
		<ErrorMessage message="Proszę wpisać poprawne hasło.Hasło powinno zawierać od 6 do 20 znaków oraz dużą literę i cyfrę." />
	)

	const acceptError = vm.error.accept && vm.isTrySave && (
		<ErrorMessage message="Proszę zaakceptować aby stworzyć konto." />
	)

	return (
		<section className="register">
			<div className="logo">
				<img src="/assets/bz.png" alt="logo" />
			</div>
			<div>
				Bądź zdrowy
				<div className="block">
					<h1>
						Utwórz konto
					</h1>
					<form onSubmit={vm.save}>
						<div>
							<label htmlFor="email">
								Twój E-mail
							</label>
							<input
								type="text"
								name="email"
								id="email"
								placeholder="nazwa@email.com"
								value={vm.email}
								onChange={e => vm.setEmail(e.target.value)}
							/>
							{emailError}
						</div>
						<div>
							<label htmlFor="name">
								Twoje Imię
							</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="wpisz swoje imię"
								value={vm.userName}
								onChange={e => vm.setUserName(e.target.value)}
							/>
							{nameError}
						</div>
						<div>
							<label htmlFor="password">Hasło</label>
							<input
								type="password"
								autoComplete="on"
								name="password"
								id="password"
								placeholder="••••••••"
								value={vm.password}
								onChange={e => vm.setPassword(e.target.value)}
							/>
							{passwordError}
						</div>
						<label data-role="checkbox">
							<input
								id="terms"
								type="checkbox"
								checked={vm.isAccept}
								onChange={vm.setAccept}
							/>
							Akceptuję&nbsp;
							<a>Warunki założenia konta</a>
						</label>
						{acceptError}
						<button type="submit">
							Stwórz konto
						</button>
						<p className="desc">
							Masz już konto?&nbsp;
							<Link to='/log-in'>Zaloguj się</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	)
})
