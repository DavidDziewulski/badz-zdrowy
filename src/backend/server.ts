import express from 'express';
import * as path from 'path';
import { db } from '../../database.config';
import router from './router';

const app = express();

const port = 3000;

app.use(express.json());

app.use(router);

db.sync().then(() => {
	console.log('server is running on port' + port);
})

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})