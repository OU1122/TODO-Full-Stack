import React from "react";
import DroppableTasks from "../component/droppable-tasks";

export default function Tasks({
	setTodo,
	todos,
	setTodos,
	filteredTodos,
	filterView,
}) {
	const toggleComplete = async (todo) => {
		try {
			const updatedTodo = { ...todo, completed: !todo.completed };
			const response = await fetch(
				`http://localhost:3000/todos/${todo.todo_id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedTodo),
				}
			);
			console.log(response);
			setTodos(
				todos.map((t) => (t.todo_id === todo.todo_id ? updatedTodo : t))
			);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="sm:max-h-52 max-h-72 overflow-y-scroll rounded-tl-xl rounded-tr-xl">
			<DroppableTasks
				todos={todos}
				setTodos={setTodos}
				filteredTodos={filteredTodos}
				toggleComplete={toggleComplete}
				filterView={filterView}
			/>
		</div>
	);
}
