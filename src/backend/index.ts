import express from 'express';
import * as path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
	res.send('Express + TypeScript Serves');
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});