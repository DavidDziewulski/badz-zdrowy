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

			navigate('/app/home')
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

	const dontFindDiet = vm.isNotFoundDiet && <p>Nie mamy obecnie diety dla ciebie</p>;

	const ProposalDiet = observer(() => {
		if (vm.proposalDiet.length < 1) {
			return;
		}
		console.log(vm.proposalDiet.length)
		const result = vm.proposalDiet.map(item => (
			<>
				<h1>{item.name}</h1>
				<p>{item.kcal}</p>
				<button onClick={() => vm.setProposalDiet(item.id)}> Wybierz</button>
			</>
		))

		return (
			<div>
				{result}

				<button onClick={vm.assignDiet}>Zapisz decyzję</button>
			</div>
		)
	})


	return (
		<div>
			<div>Tutaj znajduje się opis kalkulatora</div>
			<div>
				<div>
					<span>Płeć</span>
					<select onChange={e => vm.setSex(e.target.value as Sex)}>
						<option value={Sex.female}>
							Kobieta
						</option>
						<option value={Sex.male}>
							Mężczyzna
						</option>
					</select>
				</div>
				<div>
					<span>Waga</span>
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
				<div>
					<span>Wzrost</span>
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
				<div>
					<span>Wiek</span>
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
				<div>
					<span>Aktywność fizyczna</span>
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
				<div>
					<span>Cel diety</span>
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
