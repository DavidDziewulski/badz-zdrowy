export const passwordValidation = (value: string) => {
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

	return regex.test(value);
}

export const userNameValidation = (value: string) => {
	const regex = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	return regex.test(value);
}

export const emailValidation = (value: string) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


	return regex.test(value);
}