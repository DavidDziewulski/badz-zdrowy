import { observer } from "mobx-react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Login, Register, NotFound } from "../Views";

export const Router = observer(() => (
	<>
		<Routes>
			<Route path="/" element={<Register />} />
			<Route path="register" element={<Register />} />
			<Route path="log-in" element={<Login />} />
			<Route path='/404' element={<NotFound />} />
			<Route path="*" element={<Navigate to="/404" replace />} />
		</Routes>
	</>
));
