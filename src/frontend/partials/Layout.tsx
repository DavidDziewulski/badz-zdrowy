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
			<header>
				<div className="logo">
					<img src="/assets/bz.png" alt="logo" />
					<div>
						Bądź zdrowy
					</div>
				</div>
				<div className="right">
					<div onClick={e => vm.setIsVisible(e)} className="button">
						Cześć, {store.user.name} ▼
					</div>
					<div ref={ref} className="dropdown" data-is-visible={vm.visible}>
						<a onClick={store.user.logOut} href="#">
							❌ Wyloguj się
						</a>
					</div>
				</div>
			</header>
			<div id="layout">
				<aside>
					<ul>
						<li>
							<NavLink to="/app/home" className={(e) => e.isActive ? 'active' : ''}>
								Mój Plan Żywieniowy
							</NavLink>
						</li>
						<li>
							<NavLink to="/app/calculator" className={(e) => e.isActive ? 'active' : ''}>
								Ustawienia Planu Żywieniowego
							</NavLink>
						</li>
						<li>
							<NavLink to="/app/diet" className={(e) => e.isActive ? 'active' : ''}>
								Zdrowe Odżywianie
							</NavLink>
						</li>
						<li>
							<NavLink to="/app/physical-health" className={(e) => e.isActive ? 'active' : ''}>
								Zdrowie Fizyczne
							</NavLink>
						</li>
						<li>
							<NavLink to="/app/mental-health" className={(e) => e.isActive ? 'active' : ''}>
								Zdrowie Psychiczne
							</NavLink>
						</li>
					</ul>
				</aside>
				<div className="content">
					<Outlet />
				</div>
			</div>
		</>
	)
});
