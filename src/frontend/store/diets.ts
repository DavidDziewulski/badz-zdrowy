import { baseUrl } from "../Api";

export class Diets {
	proposalDiet = async (kcal: number) => {
		return await fetch(`${baseUrl}api/diets`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				kcal,
			}),
		}).then((result) => result.json())
			.then(result => {
				return result;
			})
			.catch(e => e);
	}
}


