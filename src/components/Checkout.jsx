import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import CheckoutForm from "./CheckoutForm";

import StripeApiService from "../services/stripeApiService";

const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(publicKey);

export default function Checkout() {
	const navigate = useNavigate();
	const { instance, accounts } = useMsal();
	const user = accounts[0];

	const stripeService = new StripeApiService(instance, user);

	const { productId } = useParams();

	const [options, setOptions] = useState(null);

	useEffect(() => {
		loadCheckout();
	}, []);

	const loadCheckout = async () => {
		const { id } = await stripeService.getSinglePrice(productId);

		const stripeSubscription = await stripeService.createSubscription(id);

		if (stripeSubscription.message) {
			return navigate("/error/existing-subscription");
		}

		setOptions({
			clientSecret: stripeSubscription.clientSecret
		});
	};

	return options ? (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm />
		</Elements>
	) : (
		<h2>Loading checkout...</h2>
	);
}
