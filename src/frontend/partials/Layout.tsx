import { observer } from "mobx-react";
import { useRef, useState } from "react";
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

	const menuItemClassGen = (data: { isActive: boolean; }) => data.isActive
		? 'item is-active'
		: 'item';

	const [openMobileMenu, setOpenMobileMenu] = useState(false);

	const toggleMenu = () => {
		setOpenMobileMenu(!openMobileMenu);
	};

	const closeMobileMenu = () => {
		setOpenMobileMenu(false);
	}

	return (
		<>
			<header>
				<div className="logo">
					<img src="/assets/bz.png" alt="logo" />
					<div>
						Bądź zdrowy
					</div>
				</div>
				<div className="spacer" />
				<div className="right">
					<img className="hamburger" src="/assets/hamburger.svg" alt="menu" onClick={toggleMenu} />
					<div className="logout-pc">
						<div onClick={e => vm.setIsVisible(e)} className="button">
							Cześć, <strong>{store.user.name}</strong> ▼
						</div>
						<div ref={ref} className="dropdown" data-is-visible={vm.visible}>
							<a onClick={store.user.logOut} href="#">
								❌ Wyloguj się
							</a>
						</div>
					</div>
				</div>
			</header>
			<div id="layout">
				<aside>
					<div className="menu" data-is-active={openMobileMenu}>
						<div className="logout-mobile">
							<div className="button">
								Cześć, <strong>{store.user.name}</strong>
							</div>
							<div className="dropdown">
								<a onClick={store.user.logOut} href="#">
									❌ Wyloguj się
								</a>
							</div>
						</div>
						<NavLink to="/app/home" className={menuItemClassGen} onClick={closeMobileMenu}>
							✨ Mój Plan Żywieniowy
						</NavLink>
						<NavLink to="/app/calculator" className={menuItemClassGen} onClick={closeMobileMenu}>
							🍏 Ustawienia Planu Żywieniowego
						</NavLink>
						<NavLink to="/app/diet" className={menuItemClassGen} onClick={closeMobileMenu}>
							🥕 Zdrowe Odżywianie
						</NavLink>
						<NavLink to="/app/physical-health" className={menuItemClassGen} onClick={closeMobileMenu}>
							💪 Zdrowie Fizyczne
						</NavLink>
						<NavLink to="/app/mental-health" className={menuItemClassGen} onClick={closeMobileMenu}>
							🧠 Zdrowie Psychiczne
						</NavLink>
					</div>
				</aside>
				<div className="content">
					<Outlet />
				</div>
			</div>
		</>
	)
});
