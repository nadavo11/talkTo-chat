import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import RecordIcon from "./RecordIcon";

function Recorder({ handleStop }: Props) {
	return (
		<div>
			<ReactMediaRecorder
				audio
				onStop={handleStop}
				render={({ status, startRecording, stopRecording }) => (
					<div className="mt-2">
						<button
							className="bg-white p-4 rounded-full shadow-black"
							onClick={status == "recording" ? stopRecording : startRecording}
						>
							{" "}
							<RecordIcon
								classText={
									status == "recording"
										? "animate-pulse text-red-300"
										: "text-sky-500"
								}
							/>
						</button>
						<p className="mt-2 text-white font-light">{status}</p>
					</div>
				)}
			/>
		</div>
	);
}

export default Recorder;
