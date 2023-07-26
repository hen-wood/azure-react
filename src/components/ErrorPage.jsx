import { useParams } from "react-router-dom";

export default function ErrorPage() {
	const { errorType } = useParams();
	console.log(errorType);
	return (
		<div>
			<h2>Something went wrong...</h2>
			{errorType === "existing-subscription" && (
				<p>You already have a subscription...</p>
			)}
		</div>
	);
}
