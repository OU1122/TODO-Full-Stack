import React, { useEffect, useState } from "react";

export default function ActionBar({ todos }) {
	const [left, setLeft] = useState(null);

	useEffect(() => {
		setLeft(todos.length);

		return () => {};
	}, [todos]);

	return (
		<div className="mt-6 relative">
			<div className="flex flex-row justify-between items-center px-4">
				<div>{left !== null ? ` ${left} items left` : ""}</div>

				<div>
					<button type="button">Clear Completed</button>
				</div>
			</div>
			<div className=" text-slate-600 flex absolute top-0 left-1/2 flex-row gap-4 -translate-x-24">
				<button
					type="button"
					className="hover:text-slate-900">
					All
				</button>
				<button
					type="button"
					className="hover:text-slate-900">
					Active
				</button>
				<button
					type="button"
					className="hover:text-slate-900">
					Completed
				</button>
			</div>
		</div>
	);
}
