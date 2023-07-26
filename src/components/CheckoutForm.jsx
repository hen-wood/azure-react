import {
	useStripe,
	useElements,
	PaymentElement
} from "@stripe/react-stripe-js";

const baseURL = "http://localhost:5173";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async event => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();
		const { clientSecret } = elements._commonOptions.clientSecret;

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		await elements.submit();

		const result = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			clientSecret,
			confirmParams: {
				return_url: baseURL + "/success"
			}
		});

		console.log(result);

		if (result.error) {
			// Show error to your customer (for example, payment details incomplete)
			console.log(result.error.message);
		} else {
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<button disabled={!stripe}>Submit</button>
		</form>
	);
};

export default CheckoutForm;
