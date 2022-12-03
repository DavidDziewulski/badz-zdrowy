import { PhysicalActive, Sex, Target } from "../Views/Calculator/Calculator.vm";

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

export const calculateBMR = (
	sex: Sex,
	wage: string,
	heigh: string,
	old: string,
	physicActivity: PhysicalActive,
	target: Target,
) => {
	if (sex === Sex.male) {
		return Math.round((66 + (13.7 * Number(wage)) + (5 * Number(heigh)) - (6.76 * Number(old)) + target) * physicActivity);
	}

	return Math.round((655 + (9.6 * Number(wage)) + (1.8 * Number(heigh)) - (4.7 * Number(old)) + target) * physicActivity);
}


export const roundKcal = (kcal: number) => {
	if (kcal < 1900 || kcal > 3700) {
		return 0;
	}

	if (kcal > 1800 && kcal <= 2200) {
		return 2000
	}

	if (kcal > 2201 && kcal <= 2700) {
		return 2500
	}

	if (kcal > 2701 && kcal <= 3200) {
		return 3000
	}

	if (kcal > 3201 && kcal <= 3700) {
		return 3500
	}
}
