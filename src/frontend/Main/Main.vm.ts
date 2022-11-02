import { makeAutoObservable } from "mobx";

export class MainVm {
	name = 'Dawid';

	surName = 'Dziewulski';

	constructor() {
		makeAutoObservable(this);
	}
} 