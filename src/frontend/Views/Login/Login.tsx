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
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						className="w-20 h-20 mr-2"
						src="/assets/bz.png"
						alt="logo"
					/>
					Bądź zdrowy
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Zaloguj się
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={vm.save}>
							<div>
								<label
									form="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Twój E-mail
								</label>
								<input
									type="text"
									name="email"
									id="email"
									className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="nazwa@email.com"
									value={vm.email}
									onChange={e => vm.setEmail(e.target.value)}
								/>
								{emailError}
							</div>
							<div>
								<label
									form="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Hasło
								</label>
								<input
									type="password"
									autoComplete="on"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									value={vm.password}
									onChange={e => vm.setPassword(e.target.value)}
								/>
								{passwordError}
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Zaloguj
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Nie masz jeszcze konta?
								<Link to='/register' className="font-medium text-primary-600 hover:underline dark:text-primary-500" >
									Zarejestruj się
								</Link>

							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
})