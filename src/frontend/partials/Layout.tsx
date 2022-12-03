import { observer } from "mobx-react";
import { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { store } from "../store";
import { hook } from "../utils";
import { LayoutVm } from "./Layout.vm";

export const Layout = observer(() => {
	const vm = hook.useVm(() => new LayoutVm());

	const ref = useRef(null);

	const outClick = hook.useOutClick({
		ref,
		onClose: vm.onClose,
	});

	return (
		<>
			<header className="bg-gray-800 font-sans leading-normal tracking-normal mt-12">
				<nav
					aria-label="menu nav"
					className="bg-gray-800 pt-2 md:pt-1 pb-1 mt-0 h-auto fixed w-full z-20 top-0"
				>
					<div className="flex flex-wrap items-center">
						<div className="flex w-full pt-2 content-center justify-between md:justify-end">
							<ul className="list-reset flex justify-content flex-1 md:flex-none items-center">
								<li className="flex-1 md:flex-none ">
									<div className="relative inline-block">
										<button
											onClick={e => vm.setIsVisible(e)}
											className="drop-button text-white py-2 px-4"
										>
											<span className="pr-2"><i className="em em-robot_face"></i>
											</span>
											Cześć, {store.user.name}
											<svg
												className="h-3 fill-current inline"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
											>
												<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
											</svg>
										</button>
										<div
											ref={ref}
											id="myDropdown"
											className={`dropdownlist absolute bg-gray-800 text-white right-0 left-0 p-3 overflow-auto z-30 ${vm.visible}`}
										>
											<div className="border border-gray-800"></div>
											<a
												onClick={store.user.logOut}
												href="#"
												className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"
											>
												<i className="fas fa-sign-out-alt fa-fw"></i>Wyloguj się</a>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
			<aside className="flex" aria-label="Sidebar">
				<div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
					<ul className="space-y-2">
						<li>
							<NavLink to="/app/home" style={(e) => (e.isActive ? { color: 'red' } : null)} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
								<span className="ml-3">Mój Plan Żywieniowy</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/app/calculator" style={(e) => (e.isActive ? { color: 'red' } : null)} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
								<span className="ml-3">Ustawienia Planu Żywieniowego</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/app/diet" style={(e) => (e.isActive ? { color: 'red' } : null)} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
								<span className="ml-3">Zdrowe Odżywianie</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/app/physical-health" style={(e) => (e.isActive ? { color: 'red' } : null)} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
								<span className="ml-3">Zdrowie Fizyczne</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/app/mental-health" style={(e) => (e.isActive ? { color: 'red' } : null)} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
								<svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
								<span className="ml-3">Zdrowie Psychiczne</span>
							</NavLink>
						</li>
					</ul>
				</div>
				<Outlet />
			</aside>
		</>
	)
});
