import axios from "axios";
import { apiConfig } from "../authConfig";
const isDev = import.meta.env.DEV;
const baseURL = isDev ? "http://localhost:8081/api/stripe" : "/api/stripe";
const headers = { "Content-Type": "application/json" };

export default class StripeApiService {
	constructor(msalInstance, account) {
		this.msalInstance = msalInstance;
		this.account = account;
		this.instance = axios.create({ baseURL, headers });
	}

	async getAccessToken() {
		if (this.account) {
			try {
				const tokenResponse = await this.msalInstance.acquireTokenSilent({
					...apiConfig,
					account: this.account
				});
				return tokenResponse.accessToken;
			} catch (error) {
				return "";
			}
		}
	}

	async getProducts() {
		try {
			const { data } = await this.instance.get("/products");
			return data;
		} catch (error) {
			console.log({ error });
			return error;
		}
	}

	async getSinglePrice(productId) {
		try {
			const { data } = await this.instance.get(`/products/${productId}/price`);
			return data;
		} catch (error) {
			console.log({ error });
			return error;
		}
	}

	async createCustomer() {
		const authToken = await this.getAccessToken();
		try {
			const { data } = await this.instance.post(
				`/create-customer`,
				{},
				{ headers: { Authorization: "Bearer " + authToken } }
			);

			return data;
		} catch (error) {
			console.log({ error });
			return error;
		}
	}

	async createSubscription(priceId) {
		const authToken = await this.getAccessToken();
		try {
			const { data } = await this.instance.post(
				`/create-subscription`,
				{ priceId },
				{ headers: { Authorization: "Bearer " + authToken } }
			);
			console.log(data);
			return data;
		} catch (error) {
			console.log({ error });
			return error;
		}
	}
}
