import React from "react";
import { useState } from "react";
import Title from "./Title";
import Recorder from "./Recorder";
import axios from "axios";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

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

						const messagesARR = [...messages, newMessage, responseMessage];
						setMessages(messagesARR);
						console.log(messagesARR);

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
				{/* {messeges} */}
				<div className="mt-5 px-5">
					<List
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "background.paper",
							position: "relative",
							overflow: "auto",
							marginTop: "60px",
							height: "60%",

							//marginBottom: "160px",

							"& ul": { padding: 0 },
						}}
					>
						{messages.map((message, index) => {
							return (
								<>
									<Divider />

									<div>
										<ListItem>
											{/* {sender} */}
											<div
												key={index + message.sender}
												className={
													"flex flex-col " +
													(message.sender == "bot" && "flex items-end")
												}
											>
												<p
													className={
														"flex " + message.sender == "bot"
															? "text-right mr-2 italic text-pink-300"
															: "mr-2 italic text-blue-300"
													}
												>
													{index}
													{/* {message.sender == "bot" ? "Chiara" : "You"} */}
												</p>
												{message.sender == "bot" && (
													<ListItemAvatar sx={{ alignSelf: "flex-end" }}>
														<Avatar
															sx={{
																width: 56,
																height: 56,
																alignSelf: "flex-end",
															}}
															alt="Travis Howard"
															src="https://files.oaiusercontent.com/file-qvHYtCgEXEunwe5KYaAAO7C5?se=2023-12-02T18%3A47%3A19Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D65d367e5-7c18-40de-9103-b2ce72017b9b.webp&sig=8wP9AeWCsWh4poeCi2PXskCSm5VALU7V0OLFdYjvsDQ%3D"
														/>
													</ListItemAvatar>
												)}
												{message.sender != "bot" && (
													<ListItemAvatar>
														<Avatar
															sx={{ width: 56, height: 56 }}
															alt="Travis Howard"
															src="https://files.oaiusercontent.com/file-nJDxxpd5U5ifsIiikTZzxTTp?se=2023-12-02T18%3A54%3A00Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D068c76c2-1c62-4667-8851-a2628bb14b32.webp&sig=ZJNH/hvgpv4vhYt/oFoVW90oT4lDjj8/X4qzgusPMVk%3D"
														/>
													</ListItemAvatar>
												)}

												{/* Audio Message */}
												<audio
													src={message.blobUrl}
													controls
													className="appearance"
												></audio>
											</div>
										</ListItem>
									</div>
								</>
							);
						})}
					</List>
				</div>

				{/* <audio src={blob} controls></audio> */}
				{/* {recoder} */}
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
