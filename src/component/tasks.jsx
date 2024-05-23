import React from "react";

export default function Tasks({
	todos,
	setTodos,
	isCompleted,
	setIsCompelted,
}) {
	const handleClick = (todo) => {
		const newArray = todos.filter((t) => t !== todo);
		setTodos(newArray);
	};

	

	return (
		<div className="bg-white rounded-lg my-4">
			
			<ul>
				{todos !== null
					? todos.map((todo, index) => (
							<li
								className="p-4 border-b-2"
								onClick={() => handleClick(todo)}
								key={index}>
								{todo}
							</li>
					  ))
					: ""}
			</ul>
		</div>
	);
}
