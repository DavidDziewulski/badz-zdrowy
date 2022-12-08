import { makeAutoObservable, observable } from 'mobx';
import { store } from '../../store';

export enum ActuallWeek {
	firstWeek = 'firstWeek',
	secondWeek = 'secondWeek',
	thirdWeek = 'thirdWeek',
	fourthWeek = 'fourthWeek',
}

export class HomeVm {
	actuallWeek = ActuallWeek.firstWeek;

	diet = store.user.diet;

	constructor() {
		makeAutoObservable(this, {
			diet: observable.deep,
		});
	}

	setWeek = (week: ActuallWeek) => {
		this.actuallWeek = week;
	}
}
