import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export default function SignInButton() {
	const { instance } = useMsal();

	const handleLogin = () => {
		instance
			.loginPopup(loginRequest)
			.then(res => {
				console.log({res})
				instance.setActiveAccount(res.account);
			})
			.catch(console.log);
	};
	return <button onClick={handleLogin}>Sign in</button>;
}
