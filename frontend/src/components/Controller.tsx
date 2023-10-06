import React from "react";
import { useState } from "react";
import Title from "./Title";
import Recorder from "./Recorder";
import axios from "axios";

function Controller() {
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<any[]>([]);

	const [blob, setBlob] = useState("");

	const createBlobUrl = (data: any) => {
		const blob = new Blob([data], { type: "audio/mp3" });
		return URL.createObjectURL(blob);
	};

	const handleStop = async (blobUrl: string) => {
		setIsLoading(true);
		// append to messages
		const newMessage = { sender: "user", blobUrl };
		const messagesARR = [...messages, newMessage];

		//convert blobURL to blob
		fetch(blobUrl).then(async (res) => {
			res.blob().then(async (blob) => {
				//construct audio file to send to backend
				const formData = new FormData();
				formData.append("file", blob, "audio.wav");

				// send to backend
				await axios
					.post("http://localhost:8000/post-audio-get", formData, {
						headers: { "Content-Type": "audio/mpeg" },
						responseType: "arraybuffer",
					})
					.then((res: any) => {
						const blob = res.data;
						const audio = new Audio();

						audio.src = createBlobUrl(blob);

						//append to audio
						const responseMessage = { sender: "bot", blobUrl: audio.src };
						messagesARR.push(responseMessage);
						setMessages(messagesARR);

						//play
						audio.play();
					})
					.catch((err) => {
						console.error("error in api request", err);
					});
			});
		});
		setIsLoading(false);
	};
	return (
		<div className="h-screen overflow-y-hidden">
			<Title setMessages={setMessages} />
			<div className="flex flex-col justify-center items-center h-full">
				<audio src={blob} controls></audio>
				{/* {recoder} */}
				{/* asdf */}
				<div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-pink-300 to to-blue-300">
					<div className="flex justify-center items-center w-full">
						<Recorder handleStop={handleStop}></Recorder>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Controller;
