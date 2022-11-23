import { makeAutoObservable } from 'mobx';
export class User {
	constructor(public email: string, public name: string) {
		makeAutoObservable(this);
	}
}