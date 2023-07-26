import { Routes, Route } from "react-router-dom";

import Subscription from "./components/Subscriptions";
import TestCalls from "./components/TestCalls";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Checkout from "./components/Checkout";
import Success from "./components/Success";
import ErrorPage from "./components/ErrorPage";

function App() {
	return (
		<>
			{/* {isAuthenticated ? <SignOutButton /> : <SignInButton />} */}
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="subscriptions" element={<Subscription />} />
					<Route path="testcalls" element={<TestCalls />} />
					<Route path="success" element={<Success />} />
					<Route path="checkout/:productId" element={<Checkout />} />
					<Route path="error/:errorType" element={<ErrorPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
