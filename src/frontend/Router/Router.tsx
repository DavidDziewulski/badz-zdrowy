import { observer } from "mobx-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { user } from "../store/user";
import { Home, Login, Register, NotFound } from "../Views";


export const Router = observer(() => {
	const isActive = Boolean(user.currentUser);
	console.log(isActive, 'isActive')
	return (
		<>
			<Routes>
				<Route path="/" element={isActive ? <Home /> : <Register />} />
				<Route path="register" element={isActive ? <Navigate to="/" replace /> : <Register />} />
				<Route path="log-in" element={isActive ? <Navigate to="/" replace /> : <Login />} />
				<Route path='/404' element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</>
	)
});
