import { Link, Outlet } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import { useIsAuthenticated } from "@azure/msal-react";

import { innerContainer, nav, outerContainer } from "../styles";

export default function Layout() {
	const isAuthenticated = useIsAuthenticated();

	const navEndPoints = [
		{ endPoint: "/", pageName: "Home" },
		{ endPoint: "/subscriptions", pageName: "Subscriptions" },
		{ endPoint: "/testcalls", pageName: "Test Calls" }
	];

	return (
		<div style={outerContainer}>
			<nav style={nav}>
				{navEndPoints.map(({ pageName, endPoint }) => (
					<Link key={pageName} to={endPoint}>
						{pageName}
					</Link>
				))}
				{isAuthenticated ? <SignOutButton /> : <SignInButton />}
			</nav>
			<div style={innerContainer}>
				<Outlet />
			</div>
		</div>
	);
}
