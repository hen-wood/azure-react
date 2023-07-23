import { useMsal } from "@azure/msal-react";
import { logOutRequest } from "../authConfig";

export default function SignOutButton() {
	const { instance } = useMsal();

	const handleSignOut = () => {
		instance.logout(logOutRequest).catch(console.log);
	};
	return (
		<button style={{ margin: "10px" }} onClick={handleSignOut}>
			Sign Out
		</button>
	);
}
