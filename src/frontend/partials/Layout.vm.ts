import { makeAutoObservable } from 'mobx';

export class LayoutVm {
	isVisible = false;

	constructor() {
		makeAutoObservable(this);
	}

	get visible() {
		if (this.isVisible) {
			return 'visible';
		}

		return 'invisible';
	}

	setIsVisible = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		this.isVisible = !this.isVisible;
	}

	onClose = () => {
		this.isVisible = false;
	}
}