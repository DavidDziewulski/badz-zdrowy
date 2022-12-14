import { observer } from "mobx-react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Layout } from "../partials";
import { store } from "../store/store";
import { Calculator, Diet, Home, Login, MentalHealth, NotFound, PhysicalHealth, Register } from "../Views";
import { Article } from "../Views/Article";

const IsNotLogi = observer(() => !store.user.isActive ? <Outlet /> : <Navigate to="/app/home" />)

const IsLogin = observer(() => store.user.isActive ? <Layout /> : <Navigate to="/" />)

export const router = createBrowserRouter([
	{
		path: "/",
		element: <IsNotLogi />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Navigate to='/log-in' />,
			},
			{
				path: 'register',
				element: <Register />
			},
			{
				path: 'log-in',
				element: <Login />
			}
		]
	},
	{
		path: "/app",
		element: <IsLogin />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Navigate to='home' />,
				errorElement: <NotFound />,
			},
			{
				path: 'home',
				element: <Home />,
				errorElement: <NotFound />,
			},
			{
				path: 'calculator',
				element: <Calculator />,
				errorElement: <NotFound />,
			},
			{
				path: 'diet',
				element: <Diet />,
				errorElement: <NotFound />,
				children: [
					{
						path: ':id',
						element: <Article />,
						errorElement: <NotFound />,
					}
				]
			},
			{
				path: 'physical-health',
				element: <PhysicalHealth />,
				errorElement: <NotFound />,
				children: [
					{
						path: ':id',
						element: <Article />,
						errorElement: <NotFound />,
					}
				]
			},
			{
				path: 'mental-health',
				element: <MentalHealth />,
				errorElement: <NotFound />,
				children: [
					{
						path: ':id',
						element: <Article />,
						errorElement: <NotFound />,
					}
				]
			},
		]
	},
	{
		path: '*',
		element: <NotFound />
	}
]);
