import React from "react";
import Input from "./component/input";
import Tasks from "./component/tasks";
import { useState } from "react";
import ActionBar from "./component/action-bar";

export default function App() {
	const [todo, setTodo] = useState({ name: "", completed: false });
	const [todos, setTodos] = useState([]);
	const [isCompleted, setIsCompleted] = useState(null);

	const handleChange = (e) => {
		setTodo({ ...todo, name: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setTodos([...todos, todo]);
		setTodo({ name: "", compelted: false });
	};

	console.log(todos);

	const filterActive = () => {};

	const filterCompleted = (todo) => {
		const newArray = todos.filter((t) => t !== todo);
		setTodos(newArray);
	};

	return (
		<>
			<div>
				<img
					className="absolute -z-50"
					src="../src/assets/bg-desktop-light.jpg"></img>
			</div>
			<div className="h-screen flex flex-col items-center justify-center">
				<div className="w-[600px]">
					<div className="text-left">
						<h1 className="text-3xl text-slate-50 rounded-2xl">Todo</h1>
					</div>
					<div className="wrapper">
						<Input
							todo={todo}
							setTodo={setTodo}
							handleSubmit={handleSubmit}
							handleChange={handleChange}
						/>
						<Tasks
							todos={todos}
							setTodos={setTodos}
							isCompleted={isCompleted}
							setIsCompleted={setIsCompleted}
						/>
						<ActionBar todos={todos} />
					</div>
				</div>
			</div>
		</>
	);
}
