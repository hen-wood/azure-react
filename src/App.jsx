import { useState } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import SignInButton from "./components/SignInButton";
import SignOutButton from "./components/SignOutButton";
import { testApiService } from "./services/testApiService.js";
import { useMsal } from "@azure/msal-react";

function App() {
	const [welcomeMessage, setWelcomeMessage] = useState(
		"Welcome, make a test api call"
	);
	const isAuthenticated = useIsAuthenticated();
	const { instance } = useMsal();

	const handleTestCallProtected = async () => {
		const { message } = await testApiService.callProtected(
			instance,
			isAuthenticated
		);
		setWelcomeMessage(message);
	};

	const handleTestCallNonProtected = async () => {
		const { message } = await testApiService.callNonProtected();
		setWelcomeMessage(message);
	};
	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "100vw",
					height: "100vh"
				}}
			>
				<h1 style={{ textAlign: "center" }}>{welcomeMessage}</h1>
				<button onClick={handleTestCallProtected}>Test Call (protected)</button>
				<button onClick={handleTestCallNonProtected}>
					Test Call (non-protected)
				</button>
				{isAuthenticated ? <SignOutButton /> : <SignInButton />}
			</div>
		</>
	);
}

export default App;
