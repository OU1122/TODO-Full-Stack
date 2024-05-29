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
		<div className="relative drop-shadow-2xl border-t-2 bg-slate-50/95 rounded-bl-xl rounded-br-xl">
			<div className="flex gap-2 px-4 sm:flex-row justify-between items-center sm:px-4 py-4 bg-slate-50/95 rounded-bl-xl rounded-br-xl">
				<div className="text-slate-600 bg-slate-50/95 hover:text-sky-700 font-semibold tracking-wider">
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
			<div className=" text-slate-600 flex bg-slate-50/95 p-4 sm:p-0 sm:top-4 items-center justify-center border-t-2 rounded-bl-xl rounded-br-xl sm:border-hidden  sm:absolute sm:left-1/2 flex-row gap-4 sm:-translate-x-24">
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
