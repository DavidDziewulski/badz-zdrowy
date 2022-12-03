import { makeAutoObservable } from 'mobx';
import { store } from '../../store';
import { utils } from '../../utils';

export enum Sex {
	male = 'male',
	female = 'female',
}

export enum PhysicalActive {
	verySmall = 1.3,
	small = 1.4,
	medium = 1.45,
	moreMedium = 1.55,
	moderately = 1.6,
	much = 1.7,
	veryMuch = 1.8,
	profesional = 2.0,
}

export enum Target {
	loseWeight = -500,
	keepWeight = 0,
	gainWeight = 500,
}

export class CalculatorVM {
	sex = Sex.female;

	wage = '';

	heigh = '';

	old = '';

	physicActivity = PhysicalActive.verySmall;

	target = Target.loseWeight;

	error = {
		wage: true,
		heigh: true,
		old: true,
	};

	isTrySave = false;

	isSaving = false;

	bmr = 0;

	constructor() {
		makeAutoObservable(this);
	}

	test = () => [
		this.error.wage,
		this.error.heigh,
		this.error.old,
	].includes(true);

	setSex = (value: Sex) => {
		this.sex = value;
	}

	setWage = (value: string) => {
		const valueAsNumber = Number(value);

		if (valueAsNumber > 230 || valueAsNumber < 0) {
			return
		}

		this.wage = value;

		if (valueAsNumber < 30) {
			this.error.wage = true;
			return
		}

		this.error.wage = false;
	}
	setHeigh = (value: string) => {
		const valueAsNumber = Number(value);

		if (valueAsNumber > 220 || valueAsNumber < 0) {
			return
		}

		this.heigh = value;

		if (valueAsNumber < 120) {
			this.error.heigh = true;
			return
		}

		this.error.heigh = false;
	}

	setOld = (value: string) => {
		const valueAsNumber = Number(value);

		if (valueAsNumber > 100 || valueAsNumber < 0) {
			return
		}

		this.old = value;

		if (valueAsNumber < 10) {
			this.error.old = true;
			return
		}

		this.error.old = false;
	}

	setPhysicActivity = (value: PhysicalActive) => {
		this.physicActivity = value;
	}

	setTarget = (value: Target) => {
		this.target = value;
	}

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
			this.bmr = utils.calculateBMR(
				this.sex,
				this.wage,
				this.heigh,
				this.old,
				this.physicActivity,
				this.target,
			)

			const kcal = utils.roundKcal(this.bmr);

			if (!kcal) {
				console.log(kcal);
				console.log('nie ma diety');
				this.isSaving = false;
				return
			}

			const test = utils.roundKcal(this.bmr);
			console.log('here')
			const result = await store.diets
				.proposalDiet(test);

			// console.log(result);

			// if (!result.ok) {
			// 	console.log(result, 'error')
			// }

			// console.log(result, 'okej');

			// if (!result.ok) {
			// 	if (result.msg) {
			// 		this.onMsg(`${result.msg}`, 'error', true);

			// 		this.isSaving = false;

			// 		return;
			// 	}

			// 	this.onMsg(`${result.errors[0].msg}`, 'error', true);

			// 	this.isSaving = false;

			// 	return;
			// }

			this.isSaving = false;
		}
		)()
	}
}
