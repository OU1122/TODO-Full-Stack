import React from "react";
import Input from "./component/input";
import Tasks from "./component/tasks";
import { useState } from "react";
import ActionBar from "./component/action-bar";

export default function App() {
	const [todo, setTodo] = useState({ name: "", completed: false });
	const [todos, setTodos] = useState([]);
	const [filterView, setFilterView] = useState("all");

	const handleChange = (e) => {
		setTodo({ ...todo, name: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setTodos([...todos, todo]);
		setTodo({ name: "", completed: false });
	};

	const clearCompleted = () => {
		const newArray = todos.filter((item) => !item.completed);
		setTodos(newArray);
		console.log(newArray);
	};

	const filteredTodos = todos.filter((todo) => {
		if (filterView === "all") return true;
		if (filterView === "active") return !todo.completed;
		if (filterView === "completed") return todo.completed;
	});

	return (
		<>
			<div className="bg-black h-screen w-screen bg-opacity-[0.1]">
				<div className="">
					<img
						className="absolute -z-50 h-screen w-screen object-cover"
						src="../src/assets/bg.jpg"></img>
				</div>
				<div className="absolute top-[170px] left-1/2 -translate-x-[300px] flex flex-col items-center ">
					<div className="w-[600px]">
						<div className="text-left">
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
								setTodos={setTodos}
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
		</>
	);
}
