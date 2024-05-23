import React from "react";

export default function Input({ todo, setTodo, handleSubmit, handleChange }) {
	return (
		<div className="my-4 ">
			<form onSubmit={handleSubmit}>
				<input
					className="p-4 w-full rounded-xl"
					value={todo.name}
					onChange={handleChange}
					placeholder="Create new todo"></input>
			</form>
		</div>
	);
}
