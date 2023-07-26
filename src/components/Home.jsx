import { useMsal, useIsAuthenticated } from "@azure/msal-react";

export default function Home() {
	const isAuthenticated = useIsAuthenticated();
	const { accounts } = useMsal();
	const user = accounts[0];

	return (
		<div>
			<h1>Henwood test site</h1>
			{isAuthenticated ? (
				<h2>Logged in as {user.name}</h2>
			) : (
				<h2>Not logged in</h2>
			)}
		</div>
	);
}
