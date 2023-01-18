import { observer } from "mobx-react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { store } from "../../store";
import { hook } from "../../utils";
import { ActuallWeek, HomeVm } from "./Home.vm";

type Props = {
	vm: HomeVm;
}

const Plan = observer(({ vm }: Props) => (
	<div className="plan">
		<h1>Twój Plan Żywieniowy <i>{store.user?.diet.name}</i></h1>
		<div className="subheader">
			Aby zmienić Plan żywieniowy przejdź do zakładki&nbsp;
			<NavLink to="/app/calculator">
				<strong>🍏 Ustawienia Planu Żywieniowego</strong>
			</NavLink>
		</div>
		<div className="weeks">
			<button
				type="button"
				data-is-active={ActuallWeek.firstWeek === vm.actuallWeek}
				onClick={() => vm.setWeek(ActuallWeek.firstWeek)}
			>
				Tydzień Pierwszy
			</button>
			<button
				type="button"
				data-is-active={ActuallWeek.secondWeek === vm.actuallWeek}
				onClick={() => vm.setWeek(ActuallWeek.secondWeek)}
			>
				Tydzień Drugi
			</button>
			<button
				type="button"
				data-is-active={ActuallWeek.thirdWeek === vm.actuallWeek}
				onClick={() => vm.setWeek(ActuallWeek.thirdWeek)}
			>
				Tydzień Trzeci
			</button>
			<button
				type="button"
				data-is-active={ActuallWeek.fourthWeek === vm.actuallWeek}
				onClick={() => vm.setWeek(ActuallWeek.fourthWeek)}
			>
				Tydzień Czwarty
			</button>
		</div>
		<table>
			<thead>
				<tr>
					<th>Posiłek</th>
					<th>Poniedziałek</th>
					<th>Wtorek</th>
					<th>Środa</th>
					<th>Czwartek</th>
					<th>Piątek</th>
					<th>Sobota</th>
					<th>Niedziela</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Śniadanie</td>
					{store.user?.diet[vm.actuallWeek].breakfast.map((item, i) => (
						<Fragment key={item.title + i}>
							<td><span>{item.title}</span>
								{item.desc.map((el, i) => (
									<li key={el + i}>{el}</li>
								))}
							</td>
						</Fragment>
					))}
				</tr>
				<tr>
					<td >Obiad</td>
					{store.user?.diet[vm.actuallWeek].dinner.map((item, i) => (
						<Fragment key={item.title + i}>
							<td><span>{item.title}</span>
								{item.desc.map((el, i) => (
									<li key={el + i}>{el}</li>
								))}
							</td>
						</Fragment>
					))}
				</tr>
				<tr>
					<td>Kolacja</td>
					{store.user?.diet[vm.actuallWeek].supper.map((item, i) => (
						<Fragment key={item.title + i}>
							<td><span>{item.title}</span>
								{item.desc.map((el, i) => (
									<li key={el + i}>{el}</li>
								))}
							</td>
						</Fragment>
					))}
				</tr>
			</tbody>
		</table>
	</div >
));

const WithoutPlan = () => (
	<div className="without-plan">
		<h2>😥 Obecnie nie masz wybranego planu żywieniowego</h2>
		<span>
			Aby wybrać Plan żywieniowy przejdź do zakładki&nbsp;
			<NavLink to="/app/calculator">
				<strong>🍏 Ustawienia Planu Żywieniowego</strong>
			</NavLink>
		</span>
	</div>
);

export const Home = observer(() => {
	const vm = hook.useVm(() => new HomeVm(), [store.user.isSaving]);

	const Content = vm.diet ? <Plan vm={vm} /> : <WithoutPlan />

	return (Content)
});
