import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import { store } from "../../store";
import { hook } from "../../utils";
import { ActuallWeek, HomeVm } from "./Home.vm";

type Props = {
	vm: HomeVm;
}

const Plan = observer(({ vm }: Props) => (
	<div className="flex flex-wrap text-center content-center text-white w-full">
		<div className="w-full">
			<h2 className="p-4 ">Twój Plan Żywieniowy</h2>
			<span className="w-full">
				Aby zmienić Plan żywieniowy przejdź do zakładki,
				<NavLink className="font-bold hover:text-gray-400" to="/app/calculator">
					Ustawienia Planu Żywieniowego
				</NavLink>
			</span>
		</div>
		<div className="my-6 w-full">
			<button
				type="button"
				className="m-4 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
				onClick={() => vm.setWeek(ActuallWeek.firstWeek)}
			>
				Tydzień Pierwszy
			</button>
			<button
				type="button"
				className="m-4 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
				onClick={() => vm.setWeek(ActuallWeek.secondWeek)}
			>
				Tydzień Drugi
			</button>
			<button
				type="button"
				className="m-4 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
				onClick={() => vm.setWeek(ActuallWeek.thirdWeek)}
			>
				Tydzień Trzeci
			</button>
			<button
				type="button"
				className="m-4 bg-white hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
				onClick={() => vm.setWeek(ActuallWeek.fourthWeek)}
			>
				Tydzień Czwarty
			</button>
		</div>
		<table className="table-auto w-full">
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
				<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<td className="border-r">śniadanie</td>
					{store.user?.diet[vm.actuallWeek].breakfast.map(item => (
						<>
							<td key={item.title} className="border-r"><span>{item.title}</span>
								{item.desc.map(el => (
									<li key={el}>{el}</li>
								))}
							</td>
						</>
					))}
				</tr>
				<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<td className="border-r">Obiad</td>
					{store.user?.diet[vm.actuallWeek].dinner.map(item => (
						<>
							<td key={item.title} className="border-r"><span>{item.title}</span>
								{item.desc.map(el => (
									<li key={el}>{el}</li>
								))}
							</td>
						</>
					))}
				</tr>
				<tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
					<td className="border-r">Kolacja</td>
					{store.user?.diet[vm.actuallWeek].supper.map(item => (
						<>
							<td key={item.title} className="border-r"><span>{item.title}</span>
								{item.desc.map(el => (
									<li key={el}>{el}</li>
								))}
							</td>
						</>
					))}
				</tr>
			</tbody>
		</table>
	</div >
));

const WithoutPlan = () => (
	<div className="flex flex-wrap text-center content-center text-white w-full">
		<h2 className="w-full font  p-4 ">Obecnie nie masz wybranego planu żywieniowego</h2>
		<span className="w-full">
			Aby wybrać Plan żywieniowy przejdź do zakładki ,
			<NavLink className="font-bold hover:text-rose-900" to="/app/calculator">
				Ustawienia Planu Żywieniowego
			</NavLink>
		</span>
	</div>
);

export const Home = observer(() => {
	const vm = hook.useVm(() => new HomeVm());

	const Content = vm.hasDiet ? <Plan vm={vm} /> : <WithoutPlan />

	return (Content)
});
