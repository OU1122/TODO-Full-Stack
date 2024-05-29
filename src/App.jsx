import React from "react";
import Input from "./component/input";
import Tasks from "./component/tasks";
import { useState, useEffect } from "react";
import ActionBar from "./component/action-bar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import axios from "axios";
import LoginButton from "./component/login-button";

export default function App() {
	const [todo, setTodo] = useState({ name: "", completed: false });
	const [todos, setTodos] = useState([]);
	const [filterView, setFilterView] = useState("all");

	const handleChange = (e) => {
		setTodo({ ...todo, name: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const body = todo;
			const response = await fetch("http://localhost:3000/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const newTodo = await response.json();
			console.log(newTodo);
			setTodos((prevTodos) => [...prevTodos, newTodo]);
			setTodo({ name: "", completed: false });
		} catch (err) {
			console.error(err);
		}
	};

	const fetchTodos = async () => {
		try {
			const response = await fetch("http://localhost:3000/todos", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			if (!response.ok) {
				throw new Error("Failed to fetch todos");
			}
			const todos = await response.json();

			setTodos(todos.rows);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const clearCompleted = async () => {
		try {
			const deleteTodo = await fetch("http://localhost:3000/todos", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
		} catch (error) {
			console.error(error);
		}
		fetchTodos();
	};

	const filteredTodos = todos.filter((todo) => {
		if (filterView === "all") return true;
		if (filterView === "active") return !todo.completed;
		if (filterView === "completed") return todo.completed;
	});

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="bg-black h-screen w-screen bg-opacity-[0.1]">
				<div className="absolute -z-50 bg-[url('../src/assets/bg.jpg')] bg-cover w-screen h-screen"></div>
				<div className="sm:absolute sm:top-[170px] sm:left-1/2 sm:-translate-x-[330px] flex flex-col items-center px-10">
					<div className="w-full sm:w-[600px] mt-20 sm:mt-0">
						<div className="text-left flex flex-row justify-between">
							<h1 className="text-3xl text-slate-50 rounded-2xl font-bold tracking-wider drop-shadow-2xl uppercase">
								Todo
							</h1>
						</div>
						<div className="wrapper">
							<Input
								todo={todo}
								setTodo={setTodo}
								handleSubmit={handleSubmit}
								handleChange={handleChange}
							/>
							<Tasks
								filteredTodos={filteredTodos}
								todos={todos}
								setTodo={setTodo}
								setTodos={setTodos}
								filterView={filterView}
							/>
							<ActionBar
								filterView={filterView}
								setFilterView={setFilterView}
								todos={todos}
								clearCompleted={clearCompleted}
							/>
						</div>
					</div>
				</div>
			</div>
		</DndProvider>
	);
}
