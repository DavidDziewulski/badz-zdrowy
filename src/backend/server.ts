import { staticArts } from './store/articles';
import express from 'express';
import * as path from 'path';
import { db } from '../../database.config';
import { Diet } from './models';
import router from './router';
import { dietStatic } from './store';
import { Article, ArtType } from './models/article';

const initialValue = async () => {
	const diet = JSON.stringify(dietStatic);

	await Diet.create({ kcal: 1500, data: diet, name: 'Dieta 1500 kcal Wege' })
	await Diet.create({ kcal: 1500, data: diet, name: 'Dieta 1500 kcal Normal' })
	await Diet.create({ kcal: 1500, data: diet, name: 'Dieta 1500 kcal Sport' })

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

	await Diet.create({ kcal: 4000, data: diet, name: 'Dieta 4000 kcal Wege' })
	await Diet.create({ kcal: 4000, data: diet, name: 'Dieta 4000 kcal Normal' })
	await Diet.create({ kcal: 4000, data: diet, name: 'Dieta 4000 kcal Sport' })

	const arts = JSON.stringify(staticArts);

	await Article.create({ title: 'Jak się mierzyć?', description: 'Mierzenie się to bardzo dobry sposób pozwalający kontrolować proces i zachodzące zmiany w sylwetce. Niestety mało kto robi to dobrze, dlatego w tym wpisie dowiesz się jak wykonywać pomiary poprawnie.    Spis treści:  Jakie parametry kontrolować i jak się mierzyć?  Jak...', icon: 'jaksiemierzyc.jpg', data: arts, category: ArtType.diet })

	await Article.create({ title: 'Jak wyszczuplić łydki', description: 'Większość kobiet uważa, że zbyt duże łydki nie wyglądają estetycznie, dlatego starają się zrobić co tylko możliwe, aby zmniejszyć ich obwód. Powodują one problemy związane z zakupem pasującego obuwia, wpędzają w kompleksy, a to doprowadza do spadku pewności siebie. ...', icon: 'jakwyszczuplić.jpg', data: arts, category: ArtType.diet })

	await Article.create({ title: 'Jak poradzić sobie z zaparciami', description: 'Większość kobiet uważa, że zbyt duże łydki nie wyglądają estetycznie, dlatego starają się zrobić co tylko możliwe, aby zmniejszyć ich obwód. Powodują one problemy związane z zakupem pasującego obuwia, wpędzają w kompleksy, a to doprowadza do spadku pewności siebie. ...', icon: 'zaparcia.jpg', data: arts, category: ArtType.diet })

	await Article.create({ title: 'Utrata Masy Ciała podczas odchudzania', description: 'Do wakacji coraz bliżej i związku z tym wiele osób chce pozbyć się nadmiaru tkanki tłuszczowej, a jako wyznacznik mierzenia postępów wybiera sobie zwykłą wagę jednocześnie nie widząc, że to jeden z najgorszych wyznaczników mierzenia podstępów podczas odchudzania....', icon: 'masaciala.jpg', data: arts, category: ArtType.diet })

	await Article.create({ title: 'Co jeść żeby schudnąć', description: 'Do wakacji coraz mniej czasu i  w związku z tym coraz więcej osób chce zrzucić zbędne kilogramy w jak najkrótszym możliwym czasie! Co jeść, żeby schudnąć? Jest to pierwsze pytanie, które przychodzi na myśl. Spis treści: Co jest podstawą diety odchudzającej? Ile można...', icon: 'cojesc.jpg', data: arts, category: ArtType.diet })

	await Article.create({ title: 'Jak pozbyć się nadmiaru wody z organizmu', description: 'Dziś pod lupę weźmiemy sobie retencje wody w organizmie, która wpływa na uczucie ciężkości, cellulit oraz dodatkowe kilogramy! Poniżej znajdziesz informacje jak pozbyć się jej nadmiaru oraz cieszyć się zdrowiem oraz smukłą sylwetką. Spis treści: Zatrzymanie wody w...', icon: 'woda.png', data: arts, category: ArtType.diet })

	await Article.create({ title: 'Kiedy i jak często trenować?', description: 'Kiedy i jak często trenować? – to pytanie zadają sobie osoby, które chcą zmienić swoją sylwetkę i zaczynają swoją przygodę z aktywnością fizyczną. Jak w każdej kwestii- są różne teorie, dlatego dziś postaram się odpowiedzieć na to pytanie z mojej perspektywy. Czego...', icon: 'trening.png', data: arts, category: ArtType.physic })

	await Article.create({ title: 'Co jeśc przed treningiem', description: 'Kiedy i jak często trenować? – to pytanie zadają sobie osoby, które chcą zmienić swoją sylwetkę i zaczynają swoją przygodę z aktywnością fizyczną. Jak w każdej kwestii- są różne teorie, dlatego dziś postaram się odpowiedzieć na to pytanie z mojej perspektywy. Czego...', icon: 'przedtreningiem.png', data: arts, category: ArtType.physic })

	await Article.create({ title: 'Co jeśc po treningu', description: 'Posiłek potreningowy jest bardzo ważny, a unikanie go lub odwlekanie w czasie to ogromny błąd, gdy celem jest poprawa regeneracji i wyglądu sylwetki. Po sesji treningowej należy zjeść zbilansowany posiłek, który pomoże uzupełnić straty wynikające z aktywności. Dobrze...', icon: 'potreningu.png', data: arts, category: ArtType.physic })

	await Article.create({ title: 'Jak zadbać o regenerację?', description: 'Według publikacji naukowych organizm potrzebuje na regeneracje około dwie doby i właśnie z tego powodu należy zwrócić uwagę na rozmieszczenie jednostek treningowych w skali tygodnia. Okres tych   24 h nie oznacza, że osoby powinny siedzieć cały dzień w domu i leżeć...', icon: 'regeneracja.png', data: arts, category: ArtType.physic })

	await Article.create({ title: 'Jak szybko zbudować masę mięśniową?', description: 'Chcesz zbudować masę mięśniową, ale nie wiesz od czego zacząć? Z tego artykułu dowiesz się, ile razy w tygodniu najlepiej trenować oraz co jeść, aby osiągnąć wymarzoną sylwetkę.Spis treści:• Jak szybko zbudować masę mięśniową?• Budowanie masy mięśniowej- kluczowe...', icon: 'masamiesniowa.png', data: arts, category: ArtType.physic })

	await Article.create({ title: 'Aeroby czy interwały?', description: 'Osoby, które podjęły decyzję o wprowadzeniu aktywności często zastanawiają się jaką formę treningu wydolnościowego wybrać, aby były oczekiwane rezultaty. Dziś postaram się odpowiedzieć na to pytanie i doradzić co będzie najlepsze dla Ciebie! Czego się dowiesz? Co to...', icon: 'aeroby.png', data: arts, category: ArtType.physic })
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
