import { Router } from "./Router";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

const $documentBody = document.getElementById('app');

if ($documentBody) {
	createRoot($documentBody).render(
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	)
};
