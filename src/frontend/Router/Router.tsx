import { observer } from "mobx-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "../store/store";
import { Home, Login, Register, NotFound } from "../Views";


export const Router = observer(() => (
	<>
		<Routes>
			<Route path="/" element={store.isActive ? <Home /> : <Login />} />
			<Route path="register" element={store.isActive ? <Navigate to="/" replace /> : <Register />} />
			<Route path="log-in" element={store.isActive ? <Navigate to="/" replace /> : <Login />} />
			<Route path='/404' element={<NotFound />} />
			<Route path="*" element={<Navigate to="/404" replace />} />
		</Routes>
	</>
)
);
