import React from "react";
import clsx from "clsx";

export default function Tasks({ todos, setTodos, filteredTodos }) {
	const handleClick = (todo) => {
		let updatedTodos = todos.map((item) =>
			item.name === todo.name
				? { ...item, completed: !item.completed }
				: item
		);

		setTodos(updatedTodos);
	};

	return (
		<div className="bg-white rounded-tl-xl rounded-tr-xl drop-shadow-xl">
			<ul>
				{filteredTodos.length > 0 ? (
					filteredTodos.map((todo, index) => (
						<li
							className={clsx(
								"flex flex-row items-center gap-4 p-4 border-b-2 text-slate-800",
								todo.completed && "text-slate-400 line-through"
							)}
							onClick={() => handleClick(todo)}
							key={index}>
							<span className="h-5 w-5">
								<img
									src={
										todo.completed
											? "../src/assets/icon-check.svg"
											: "../src/assets/icon-circle.svg"
									}></img>
							</span>
							{todo.name}
						</li>
					))
				) : (
					<li className="flex flex-row items-center gap-4 p-4 border-b-2 text-slate-800">
						Add a task to your list ⬆️
					</li>
				)}
			</ul>
		</div>
	);
}
