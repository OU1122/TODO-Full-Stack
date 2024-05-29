import React from "react";
import { useDrag } from "react-dnd";

const DraggableTask = ({ todo, index, toggleComplete }) => {
	const [{ isDragging }, drag] = useDrag({
		type: "TASK",
		item: { index, id: todo.id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<li
			ref={drag}
			className={`flex flex-row items-center gap-4 p-4 border-b-2 text-slate-800 ${
				isDragging ? "opacity-50" : ""
			} ${todo.completed ? "text-slate-400 line-through" : ""}`}
			onClick={() => toggleComplete(todo)}>
			<span className="h-5 w-5">
				<img
					src={
						todo.completed
							? "../src/assets/icon-check.svg"
							: "../src/assets/icon-circle.svg"
					}
					alt={todo.completed ? "Completed" : "Pending"}
				/>
			</span>
			{todo.name}
		</li>
	);
};

export default DraggableTask;
