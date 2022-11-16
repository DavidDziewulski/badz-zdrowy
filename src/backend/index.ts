import express from 'express';
import * as path from 'path';
import { Database } from 'sqlite3';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../../public')));

const db = new Database('./emp_database.db', (err) => {
	if (err) {
		console.error("Erro opening database " + err.message);
	}

	db.run('CREATE TABLE users( \
            userId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            email NVARCHAR(100),\
            name NVARCHAR(20)  NOT NULL,\
            password NVARCHAR(20)  NOT NULL,\)',
		(err) => {
			if (err) {
				console.log("Table already exists.");
				return;
			}

			const insert = 'INSERT INTO users (email, name, password) VALUES (?,?,?,?,?)';
			db.run(insert, ["Chandan", "Praveen", "SE", "Address 1", 1]);
			db.run(insert, ["Samanta", "Mohim", "SSE", "Address 2", 1]);
			db.run(insert, ["Gupta", "Pinky", "TL", "Address 3", 1]);
		});
}
);

app.get("/users/:id", (req, res) => {
	const { id } = req.params;
	db.get(`SELECT * FROM users where employee_id = ?`, id, (err, row) => {
		if (err) {
			res.status(400).json({ "error": err.message });
			return;
		}

		if (!row) {
			res.status(404).json({
				result: `We don't have employe with id=${id}`,
				status: 404,
			});
			return;
		}

		res.status(200).json({
			result: row,
			status: 200,
		});
	});
});

app.get("/users", (req, res, next) => {
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			res.status(400).json({ "error": err.message });
			return;
		}
		res.status(200).json({ rows });
	});
});

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});