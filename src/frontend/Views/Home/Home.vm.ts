import { makeAutoObservable } from 'mobx';
import { store } from '../../store';

export enum ActuallWeek {
	firstWeek = 'firstWeek',
	secondWeek = 'secondWeek',
	thirdWeek = 'thirdWeek',
	fourthWeek = 'fourthWeek',
}

export class HomeVm {
	hasDiet = store.user.diet;

	actuallWeek = ActuallWeek.firstWeek;

	constructor() {
		makeAutoObservable(this);
	}

	setWeek = (week: ActuallWeek) => {
		this.actuallWeek = week;
	}
}
