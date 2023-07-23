import { useState } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";
import TestApiService from "./services/testApiService.js";
import { useMsal } from "@azure/msal-react";

function App() {
	const isAuthenticated = useIsAuthenticated();
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

	const handleTestCallProtectedBasic = async () => {
		setResponseMessage("Loading from backend...");
		const { message } = await testApiService.callProtectedBasic();
		setResponseMessage(message);
	};

	const handleTestCallProtectedPremium = async () => {
		setResponseMessage("Loading from backend...");
		const { message } = await testApiService.callProtectedPremium();
		setResponseMessage(message);
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "100vw",
					height: "100vh"
				}}
			>
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
					{isAuthenticated ? <SignOutButton /> : <SignInButton />}
					<button
						style={{ margin: "10px" }}
						onClick={handleTestCallNonProtected}
					>
						Test Call (non-protected)
					</button>
					<button style={{ margin: "10px" }} onClick={handleTestCallProtected}>
						Test Call (protected - require auth)
					</button>
					<button
						style={{ margin: "10px" }}
						onClick={handleTestCallProtectedBasic}
					>
						Test Call (protected - require basic sub)
					</button>
					<button
						style={{ margin: "10px" }}
						onClick={handleTestCallProtectedPremium}
					>
						Test Call (protected - require premium sub)
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
