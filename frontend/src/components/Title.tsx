import React from "react";
import { useState } from "react";
import axios from "axios";
import App from "../App";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
		<AppBar position="fixed">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Chiara
				</Typography>
				<Button color="inherit">Reset</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Title;
