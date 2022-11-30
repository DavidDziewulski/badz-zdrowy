import { makeAutoObservable } from 'mobx';

export class HomeVm {
	constructor() {
		makeAutoObservable(this);
	}
}