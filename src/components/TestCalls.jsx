import { useState } from "react";
import { useMsal } from "@azure/msal-react";

import TestApiService from "../services/testApiService";

export default function TestCalls() {
	const { instance, accounts } = useMsal();
	const user = accounts[0];
	const testApiService = new TestApiService(instance, user);

	const welcomeMessage = user
		? `Welcome ${user.name}`
		: "Welcome, please log in to access protected resources";

	const subscriptionMessage =
		user && `Subscription: ${user.idTokenClaims.extension_Subsciption}`;

	const [responseMessage, setResponseMessage] = useState("");

	const handleTestCallNonProtected = async () => {
		setResponseMessage("Loading from backend...");
		const { message } = await testApiService.callNonProtected();
		setResponseMessage(message);
	};

	const handleTestCallProtected = async () => {
		setResponseMessage("Loading from backend...");
		const { message } = await testApiService.callProtected(instance);
		setResponseMessage(message);
	};

	return (
		<>
			<h2 style={{ textAlign: "center" }}>{welcomeMessage}</h2>
			<h3 style={{ textAlign: "center" }}>{subscriptionMessage}</h3>
			<p style={{ textAlign: "center" }}>{responseMessage}</p>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center"
				}}
			>
				<button style={{ margin: "10px" }} onClick={handleTestCallNonProtected}>
					Test Call (non-protected)
				</button>
				<button style={{ margin: "10px" }} onClick={handleTestCallProtected}>
					Test Call (protected - require auth)
				</button>
			</div>
		</>
	);
}
