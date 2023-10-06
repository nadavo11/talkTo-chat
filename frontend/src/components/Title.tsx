import React from "react";
import { useState } from "react";
import axios from "axios";

type Props = {
	setMessages: any;
};

function Title({ setMessages }: Props) {
	const [isResetting, setIsResetting] = useState(false);

	const resetChat = async () => {
		setIsResetting(true);
		const response = await axios
			.get("http://127.0.0.1:8000/reset")
			.then((res) => {
				if (res.status == 200) {
					alert(res.data);
					console.log("Resetting chat");
					setMessages([]);
				}
			})
			.catch((err) => {
				console.error("error in api request", err);
			});

		setIsResetting(false);
	};
	return (
		<div className="flex justify-between items-center w-full p4 bg-blue-950 text-white font-bold shadow">
			<div className="italic">Giovani</div>
			<button
				className={
					"transition-all duration-300 text-blue-300 hover:text-pink-500" +
					(isResetting && " animate-pulse")
				}
				onClick={resetChat}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
					/>
				</svg>
			</button>
		</div>
	);
}

export default Title;
