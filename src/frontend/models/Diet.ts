import { makeAutoObservable } from 'mobx';
import { DietWeek } from "./DietWeek";

export class Diet {
	id?: number;

	kcal: number;

	name: string;

	firstWeek?: DietWeek

	secondWeek?: DietWeek

	thirdWeek?: DietWeek

	fourthWeek?: DietWeek

	constructor() {
		makeAutoObservable(this)
	}
}
