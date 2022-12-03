import express from 'express';
import * as path from 'path';
import { db } from '../../database.config';
import { Diet } from './models';
import router from './router';
import { dietStatic } from './store';

const initialValue = async () => {
	const diet = JSON.stringify(dietStatic);

	await Diet.create({ kcal: 2000, data: diet, name: 'Dieta 2000 kcal Wege' })
	await Diet.create({ kcal: 2000, data: diet, name: 'Dieta 2000 kcal Normal' })
	await Diet.create({ kcal: 2000, data: diet, name: 'Dieta 2000 kcal Sport' })

	await Diet.create({ kcal: 2500, data: diet, name: 'Dieta 2500 kcal Wege' })
	await Diet.create({ kcal: 2500, data: diet, name: 'Dieta 2500 kcal Normal' })
	await Diet.create({ kcal: 2500, data: diet, name: 'Dieta 2500 kcal Sport' })

	await Diet.create({ kcal: 3000, data: diet, name: 'Dieta 3000 kcal Wege' })
	await Diet.create({ kcal: 3000, data: diet, name: 'Dieta 3000 kcal Normal' })
	await Diet.create({ kcal: 3000, data: diet, name: 'Dieta 3000 kcal Sport' })

	await Diet.create({ kcal: 3500, data: diet, name: 'Dieta 3500 kcal Wege' })
	await Diet.create({ kcal: 3500, data: diet, name: 'Dieta 3500 kcal Normal' })
	await Diet.create({ kcal: 3500, data: diet, name: 'Dieta 3500 kcal Sport' })
}

const app = express();

const port = 3000;

app.use(express.json());

app.use(router);

db.sync().then(async () => {
	if (await Diet.findOne({ where: { id: 1 } })) {
		return;
	}

	await initialValue()
	console.log('server is running on port' + port);
}).catch(e => console.log(e))

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
