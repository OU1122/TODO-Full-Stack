import clsx from "clsx";
import React, { useEffect, useState } from "react";

export default function ActionBar({
	todos,
	setFilterView,
	clearCompleted,
	filterView,
}) {
	const [left, setLeft] = useState(null);

	useEffect(() => {
		setLeft(todos.length);

		return () => {};
	}, [todos]);

	return (
		<div className="p-4 relative drop-shadow-2xl bg-white rounded-bl-xl rounded-br-xl">
			<div className="flex flex-row justify-between items-center px-4">
				<div className="text-slate-600 hover:text-sky-700 font-semibold tracking-wider">
					{left !== null && left !== 1
						? ` ${left} items left`
						: `${left} item left`}
				</div>

				<div>
					<button
						onClick={clearCompleted}
						type="button"
						className="text-slate-600 hover:text-sky-700 font-semibold tracking-wider">
						Clear Completed
					</button>
				</div>
			</div>
			<div className=" text-slate-600 flex absolute top-4 left-1/2 flex-row gap-4 -translate-x-24">
				<button
					type="button"
					onClick={() => setFilterView("all")}
					className={clsx(
						"text-slate-600 hover:text-sky-700 font-semibold tracking-wider",
						filterView === "all" && "text-sky-600"
					)}>
					All
				</button>
				<button
					onClick={() => setFilterView("active")}
					type="button"
					className={clsx(
						"text-slate-600 hover:text-sky-700 font-semibold tracking-wider",
						filterView === "active" && "text-sky-600"
					)}>
					Active
				</button>
				<button
					onClick={() => setFilterView("completed")}
					type="button"
					className={clsx(
						"text-slate-600 hover:text-sky-700 font-semibold tracking-wider",
						filterView === "completed" && "text-sky-600"
					)}>
					Completed
				</button>
			</div>
		</div>
	);
}
