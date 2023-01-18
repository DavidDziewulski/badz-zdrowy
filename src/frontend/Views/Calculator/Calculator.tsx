import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { SweetAlertIcon } from "sweetalert2";
import { ErrorMessage } from "../../components";
import { store } from "../../store";
import { hook } from "../../utils";
import { CalculatorVM, Sex, PhysicalActive, Target } from "./Calculator.vm";

export const Calculator = observer(() => {
	const navigate = useNavigate();

	const vm = hook.useVm(() => new CalculatorVM((
		title: string,
		icon: SweetAlertIcon,
		isError: boolean
	) => {
		hook.useAlert().fire({
			title: <p>{title}</p>,
			icon,
		}).then(() => {
			if (isError) {
				return;
			}

			navigate('/app/home');
		})
	}));

	const heighError = vm.error.heigh && vm.isTrySave && (
		<ErrorMessage message="Proszę wpisać poprawną wagę" />
	)

	const oldError = vm.error.old && vm.isTrySave && (
		<ErrorMessage message="Proszę wpisać poprawny wiek" />
	)

	const wageError = vm.error.wage && vm.isTrySave && (
		<ErrorMessage message="Proszę wpisać poprawną wagę" />
	)

	const dontFindDiet = vm.isNotFoundDiet && <h1 className="no-diet">😥 Nie mamy obecnie diety dla ciebie</h1>;

	const ProposalDiet = observer(() => {
		if (vm.proposalDiet.length < 1) {
			return;
		}

		const result = vm.proposalDiet.map(item => (
			<div key={item.id} className="item" data-is-active={item.id === vm.proposalDietId}>
				<h1>{item.name}</h1>
				<div className="kcal">{item.kcal} kcal</div>
				<button onClick={() => vm.setProposalDiet(item.id)}>Wybierz</button>
			</div>
		))

		return (
			<div className="results">
				<h1>Wybierz dietę</h1>
				<div className="list">
					{result}
				</div>
				<button onClick={vm.assignDiet}>Zapisz decyzję</button>
			</div>
		)
	})


	return (
		<div className="calculator">
			<h1>Kalkulator</h1>
			<div className="table">
				<div className="title-a">Płeć</div>
				<div className="value-a">
					<select onChange={e => vm.setSex(e.target.value as Sex)}>
						<option value={Sex.female}>
							Kobieta
						</option>
						<option value={Sex.male}>
							Mężczyzna
						</option>
					</select>
				</div>
				<div className="title-b">Waga</div>
				<div className="value-b">
					<input
						id="wage"
						onChange={e => vm.setWage(e.target.value)}
						value={vm.wage}
						type="number"
						placeholder="kg"
						min="0"
						max="230"
					/>
					{wageError}
				</div>
				<div className="title-a">Wzrost</div>
				<div className="value-a">
					<input
						type="number"
						value={vm.heigh}
						onChange={e => vm.setHeigh(e.target.value)}
						placeholder="cm"
						min="0"
						max="220"
					/>
					{heighError}
				</div>
				<div className="title-b">Wiek</div>
				<div className="value-b">
					<input
						type="number"
						value={vm.old}
						onChange={e => vm.setOld(e.target.value)}
						placeholder="lat"
						min="0"
						max="100"
					/>
					{oldError}
				</div>
				<div className="title-a">Aktywność fizyczna<sup>1</sup></div>
				<div className="value-a">
					<select onChange={e => vm.setPhysicActivity(Number(e.target.value) as PhysicalActive)}>
						<option value={PhysicalActive.verySmall}>
							1.3
						</option>
						<option value={PhysicalActive.small}>
							1.4
						</option>
						<option value={PhysicalActive.medium}>
							1.45
						</option>
						<option value={PhysicalActive.moreMedium}>
							1.55
						</option>
						<option value={PhysicalActive.moderately}>
							1.6
						</option>
						<option value={PhysicalActive.much}>
							1.7
						</option>
						<option value={PhysicalActive.veryMuch}>
							1.8
						</option>
						<option value={PhysicalActive.profesional}>
							2.0
						</option>
					</select>
				</div>
				<div className="title-b">Cel diety</div>
				<div className="value-b">
					<select onChange={e => vm.setTarget(e.target.value as Target)}>
						<option value={Target.loseWeight}>
							Schudnąć
						</option>
						<option value={Target.keepWeight}>
							Utrzymać wagę
						</option>
						<option value={Target.gainWeight}>
							Przytyć
						</option>
					</select>
				</div>
			</div>
			<h1><sup>1</sup> Rodzaje aktywności fizycznej</h1>
			<div>
				<ul>
					<li>1.3 - osoba leżąca; choroba; całkowity brak ruchu</li>
					<li>1.4 - siedzący tryb życia; ~6000 kroków dziennie</li>
					<li>1.45 - nisko aktywny tryb życia; praca biurowa; większość dnia na siedząco; 1-2x lekkie treningi w tygodniu; ~8000 kroków</li>
					<li>1.55 - średnio aktywny tryb życia; praca siedząca; 2-3x lekkie treningi w tygodniu; ~10000 kroków dziennie</li>
					<li>1.6 - umiarkowanie aktywny tryb życia; 3-4x normalne treningi w tygodniu; ~10000-12000 kroków dziennie</li>
					<li>1.7 - aktywny tryb życia; 4-5x treningów w tygodniu lub praca fizyczna; 12000 kroków dziennie</li>
					<li>1.8 - aktywny tryb życia; 5-6x treningów w tygodniu; więcej niż 10000 kroków dziennie</li>
					<li>2.0 - bardzo aktywny tryb życia; uprawianie sportu zawodowo; więcej niż 6 treningów w tygodniu</li>
				</ul>
				<button
					type="button"
					onClick={vm.save}
				>Oblicz</button>
			</div>
			{dontFindDiet}
			<ProposalDiet />
		</div>
	)
})
