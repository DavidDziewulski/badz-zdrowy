import { Main } from "./Main";
import { createRoot } from 'react-dom/client';

const $documentBody = document.getElementById('app');

if ($documentBody) {
	createRoot($documentBody).render(<Main />)
};
