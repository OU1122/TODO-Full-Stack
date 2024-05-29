import React from "react";
import { useDrop } from "react-dnd";
import DraggableTask from "../component/draggable-task";

const DroppableTasks = ({
	todos,
	setTodos,
	filteredTodos,
	toggleComplete,
	filterView,
}) => {
	const [, drop] = useDrop({
		accept: "TASK",
		hover: (draggedItem, monitor) => {
			const dragIndex = draggedItem.index;
			const hoverIndex = monitor.getItem().index;

			if (dragIndex === hoverIndex) return;

			const updatedFilteredTodos = [...filteredTodos];
			const [draggedTodo] = updatedFilteredTodos.splice(dragIndex, 1);
			updatedFilteredTodos.splice(hoverIndex, 0, draggedTodo);

			const finalUpdatedTodos = todos.map((todo) => {
				const updatedTodo = updatedFilteredTodos.find(
					(t) => t.id === todo.id
				);
				return updatedTodo || todo;
			});

			setTodos(finalUpdatedTodos);
			draggedItem.index = hoverIndex;
		},
	});

	const noTasksMessage = () => {
		if (filterView === "active") {
			return "No active tasks available";
		}
		if (filterView === "completed") {
			return "No completed tasks available";
		}
		return "Add a task to your list ⬆️";
	};

	return (
		<div
			ref={drop}
			className="bg-white/85 backdrop-blur-sm rounded-tl-xl rounded-tr-xl drop-shadow-xl">
			<ul>
				{filteredTodos.length > 0 ? (
					filteredTodos.map((todo, index) => (
						<DraggableTask
							key={todo.id}
							index={index}
							todo={todo}
							toggleComplete={toggleComplete}
						/>
					))
				) : (
					<li className="flex flex-row items-center gap-4 p-4 border-b-2 text-slate-800">
						{noTasksMessage()}
					</li>
				)}
			</ul>
		</div>
	);
};

export default DroppableTasks;
