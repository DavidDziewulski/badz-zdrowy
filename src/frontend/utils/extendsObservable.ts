import { runInAction } from 'mobx';


export const extendsObservable = <T extends unknown>(observer: T, data: Partial<T>) => {
	runInAction(() => {
		for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
			if (value === undefined) {

				continue;

			}

			observer[key as keyof T] = value as T[keyof T];
		}
	});

	return observer;
};


