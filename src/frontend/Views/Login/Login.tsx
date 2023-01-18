import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { SweetAlertIcon } from "sweetalert2";
import { ErrorMessage } from "../../components";
import { hook } from "../../utils";
import { LoginVm } from "./Login.vm";

export const Login = observer(() => {
	const vm = hook.useVm(() => new LoginVm((
		title: string,
		icon: SweetAlertIcon,
	) => {
		hook.useAlert().fire({
			title: <p>{title}</p>,
			icon,
		})
	}));

	const emailError = vm.error.email && vm.isTrySave && (
		<ErrorMessage message="Proszę wpisać poprwany adres email. Przykładowy email: nazwa@gmail.com" />
	)

	const passwordError = vm.error.password && vm.isTrySave && (
		<ErrorMessage message="Proszę wpisać poprawne hasło.Hasło powinno zawierać od 6 do 20 znaków oraz dużą literę i cyfrę." />
	)

	return (
		<section className="login">
			<div className="logo">
				<img src="/assets/bz.png" alt="logo" />
				<div>
					Bądź zdrowy
				</div>
			</div>
			<div className="block">
				<h1>Zaloguj się</h1>
				<form onSubmit={vm.save}>
					<div>
						<label htmlFor="email">Twój E-mail</label>
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
					<button type="submit">
						Zaloguj
					</button>
					<p className="desc">
						Nie masz jeszcze konta?&nbsp;
						<Link to='/register'>
							Zarejestruj się
						</Link>
					</p>
				</form>
			</div>
		</section>
	)
})
