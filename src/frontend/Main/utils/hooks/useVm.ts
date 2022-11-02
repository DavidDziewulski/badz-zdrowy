import { useEffect, useState } from "react"

type Vm = {
	mount?: () => void;
	[AnyKey: PropertyKey]: ReturnType<ObjectConstructor['values']>[number];
}

export const useVm = <T extends Vm>(
	initial: () => T,
	deps: unknown[] = [],
) => {
	const [vm, setVm] = useState(initial);
	const [isCreated, setIsCreated] = useState(true);

	useEffect(() => {
		if (isCreated) {
			setIsCreated(false);
		} else {
			setVm(initial())
		}

		vm.mount?.();

	}, deps);

	return vm;
}