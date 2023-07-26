import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import StripeApiService from "../services/stripeApiService";

const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(publicKey);

export default function Checkout() {
	const { instance, accounts } = useMsal();
	const user = accounts[0];

	const stripeService = new StripeApiService(instance, user);

	const { productId } = useParams();

	const [customer, setCustomer] = useState(null);
	const [options, setOptions] = useState(null);

	useEffect(() => {
		loadCheckout();
	}, []);

	const loadCheckout = async () => {
		const stripeCustomer = await stripeService.createCustomer();
		setCustomer(stripeCustomer);

		const { id } = await stripeService.getSinglePrice(productId);

		const stripeSubscription = await stripeService.createSubscription(id);

		setOptions({
			clientSecret: stripeSubscription.clientSecret
		});
	};

	return customer && options ? (
		<Elements stripe={stripePromise} options={options}>
			<CheckoutForm />
		</Elements>
	) : (
		<h2>Loading checkout...</h2>
	);
}
