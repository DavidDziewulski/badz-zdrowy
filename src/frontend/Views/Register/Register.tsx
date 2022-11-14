import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../components";
import { hook } from "../../utils";
import { RegisterVm } from "./Register.vm";

export const Register = observer(() => {
	const vm = hook.useVm(() => new RegisterVm());

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
							Utwórz konto
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
									form="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Twoje Imię
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="wpisz swoje imię"
									value={vm.userName}
									onChange={e => vm.setUserName(e.target.value)}
								/>
								{nameError}
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
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										type="checkbox"
										checked={vm.isAccept}
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										onChange={vm.setAccept}
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										form="terms"
										className="font-light text-gray-500 dark:text-gray-300"

									>
										Akceptuję
										<a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
											Warunki założenia konta
										</a>
									</label>
									{acceptError}
								</div>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Stwórz kontot
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Masz już konto?
								<Link to='/log-in' className="font-medium text-primary-600 hover:underline dark:text-primary-500" >Zaloguj się</Link>

							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
})