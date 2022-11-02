import { observer } from "mobx-react";
import { MainVm } from './Main.vm';
import { hook } from './utils';

export const Main = observer(() => {
	const vm = hook.useVm(() => new MainVm());

	return (
		<>
			<h1>{vm.name}</h1>
			<h1>{vm.surName}</h1>
			<h1>test</h1>
		</>
	)
})
