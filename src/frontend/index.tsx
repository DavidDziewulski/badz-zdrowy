import { render } from "preact";
import { Main } from "./Main";

const $documentBody = document.getElementById('app');

if ($documentBody) {
	render(<Main />, $documentBody)
}
