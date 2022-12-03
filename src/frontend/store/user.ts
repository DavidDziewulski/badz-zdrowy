import { baseUrl } from './../Api/baseUrl';
import { makeAutoObservable, runInAction } from 'mobx';
import { Diet } from '../models/Diet';
import { DietWeek } from '../models/DietWeek';
import { Meal } from '../models/Meal';
import { extendsObservable } from '../utils';
export class User {
	isActive = false;

	name = '';

	email = '';

	dietId?: number;

	diet?: Diet;

	constructor() {
		makeAutoObservable(this);

		this.loadUser();
	}

	getdietPlan = async () => {
		if (!this.dietId) {
			return;
		}

		await this.setDietPlan(this.dietId);
	}

	setDiet = (value: Diet) => {
		this.diet = value;
	}

	setDietPlan = async (dietId: number) => {
		await fetch(`${baseUrl}api/diet`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				dietId,
				email: this.email,
			}),
		}).then((result) => result.json()).then(result => {
			if (!result.ok) {
				return result
			};

			const json = localStorage.getItem('currentUser');

			const { email, name } = JSON.parse(json);

			localStorage.setItem('currentUser', JSON.stringify({
				email,
				name,
				dietId,
			}));

			const data = result.diet

			const newDiet = new Diet();

			const toInternalMeal = (data: any) => {
				return data.map((item: any) => {
					const newDietWeek = new Meal();

					extendsObservable(newDietWeek, {
						title: item.title,
						desc: item.desc,
					})

					return newDietWeek
				})
			}

			const toInternalWeek = (data: any) => {
				const newDietWeek = new DietWeek();

				extendsObservable(newDietWeek, {
					breakfast: toInternalMeal(data.breakfast),
					dinner: toInternalMeal(data.dinner),
					supper: toInternalMeal(data.supper),
				})

				return newDietWeek;
			}

			extendsObservable(newDiet, {
				id: data.id,
				kcal: data.kcal,
				name: data.name,
				firstWeek: toInternalWeek(data.data.firstWeek),
				secondWeek: toInternalWeek(data.data.secondWeek),
				thirdWeek: toInternalWeek(data.data.thirdWeek),
				fourthWeek: toInternalWeek(data.data.fourthWeek),
			})

			this.setDiet(newDiet);
		}).catch(e => console.log(e));
	}

	register = async (email: string, name: string, password: string) => {
		const result = await fetch(`${baseUrl}api/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				name,
				password,
			}),
		})

		return result.ok
	}

	login = async (email: string, password: string) => {
		return await fetch(`${baseUrl}api/log-in`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		}).then((result) => result.json()).then(result => {
			if (!result.ok) {
				return result
			};

			this.setUser(result.user.email, result.user.name, result.user.dietId, true)

			return result;
		}).catch(e => e);
	}

	loadUser = async () => {
		const json = localStorage.getItem('currentUser');

		if (!json) {
			return;
		}

		const { email, name, dietId } = JSON.parse(json);

		await this.setUser(email, name, dietId)
	}

	logOut = () => {
		window.localStorage.removeItem('currentUser');

		this.isActive = false;
	}

	setUser = async (email: string, name: string, dietId?: number, addToStorage?: boolean) => {
		if (addToStorage) {
			localStorage.setItem('currentUser', JSON.stringify({
				email,
				name,
				dietId,
			}));
		}

		this.email = email;

		this.name = name;

		if (dietId) {
			this.dietId = dietId;
		}

		this.isActive = true;

		await this.getdietPlan();
	}
}
