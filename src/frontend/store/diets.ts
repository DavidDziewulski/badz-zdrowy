export class Diets {
	constructor() {
	}

	proposalDiet = async (kcal: number) => {
		return await fetch('diets', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				kcal,
			}),
		}).then((result) => result.json()).then(result => {
			if (!result.ok) {
				return result
			};


			return result;
		})
			.catch(e => e);
	}
}


