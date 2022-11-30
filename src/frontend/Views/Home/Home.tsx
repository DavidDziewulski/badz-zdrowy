import { observer } from "mobx-react";
import { useRef } from "react";
import { hook } from "../../utils";
import { HomeVm } from "./Home.vm";

export const Home = observer(() => {
	const vm = hook.useVm(() => new HomeVm());

	const ref = useRef(null);

	return (
		<>
			Home
		</>
	)
});