import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import './index.less';

const $documentBody = document.getElementById('app');

if ($documentBody) {
	createRoot($documentBody).render(
		<RouterProvider router={router} />
	)
};
