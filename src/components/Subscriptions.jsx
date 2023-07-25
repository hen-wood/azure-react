import { useEffect, useState } from "react";
import StripeApiService from "../services/stripeApiService";
import { useNavigate } from "react-router-dom";

export default function Subscriptions() {
	const navigate = useNavigate();
	const stripeService = new StripeApiService();

	const [isLoaded, setIsLoaded] = useState(false);
	const [products, setProducts] = useState([]);

	const handleGetProducts = async () => {
		const data = await stripeService.getProducts();
		setProducts(data);
		setIsLoaded(true);
	};

	const handlePurchase = e => {
		const productId = e.target.value;
		return navigate(`/checkout/${productId}`);
	};

	useEffect(() => {
		handleGetProducts();
	}, []);

	return isLoaded ? (
		<div>
			{products.map(({ name, description, id }) => (
				<div key={id}>
					<p>{name}</p>
					<p>{description}</p>
					<button value={id} onClick={handlePurchase}>
						Purchase
					</button>
				</div>
			))}
		</div>
	) : (
		<div>
			<h2>Loading...</h2>
		</div>
	);
}
