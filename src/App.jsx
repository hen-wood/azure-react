import { useIsAuthenticated } from "@azure/msal-react";
import { Routes, Route } from "react-router-dom";

import Subscription from "./components/Subscriptions";
import TestCalls from "./components/TestCalls";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Checkout from "./components/Checkout";

function App() {
	const isAuthenticated = useIsAuthenticated();

	return (
		<>
			{/* {isAuthenticated ? <SignOutButton /> : <SignInButton />} */}
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="subscriptions" element={<Subscription />} />
					<Route path="testcalls" element={<TestCalls />} />
					<Route path="checkout/:productId" element={<Checkout />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
