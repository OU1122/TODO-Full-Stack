import express from "express";
import cors from "cors";
import pool from "./db.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";

const app = express();

// SESSION MIDDLEWARE
// ENV before DEPLOYMENT!!
const pgSession = connectPgSimple(session);

app.use(cors());
app.use(express.json());

// PASSPORT CONFIG

// auth
app.get(
	"/auth/google",

	passport.authenticate("google", { scope: ["profile"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		res.redirect("/");
	}
);

// create a todo

app.post("/todos", async (req, res) => {
	try {
		const { name, completed } = req.body;
		const newTodo = await pool.query(
			"INSERT INTO todo (name, completed) VALUES ($1, $2) RETURNING *",
			[name, completed]
		);
		res.json(newTodo.rows[0]);
	} catch (err) {
		console.error(err);
	}
});

// get all todos

app.get("/todos", async (req, res) => {
	try {
		const todos = await pool.query("SELECT * FROM todo");
		res.json(todos);
	} catch (err) {
		console.error(err);
	}
});

// get a todo

app.get("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [
			id,
		]);
		res.json(todo);
	} catch (err) {
		console.error(err);
	}
});

// update a todo

app.put("/todos/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { completed } = req.body;
		await pool.query("UPDATE todo SET completed = $1 WHERE todo_id = $2", [
			completed,
			id,
		]);
		res.json("todo updated");
	} catch (err) {
		console.error(err);
	}
});

// delete todos

app.delete("/todos/", async (req, res) => {
	try {
		const { completed } = req.body;
		const deleteTodo = await pool.query(
			"DELETE FROM todo WHERE completed= true"
		);
		res.json("todos deleted");
	} catch (error) {
		console.error(error);
	}
});

// LOGOUT
app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

// server test
app.get("/", (req, res) => {
	res.send("Successful response.");
});

app.listen(3000, () => console.log("Example app is listening on port 3000."));
