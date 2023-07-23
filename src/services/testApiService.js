import axios from "axios";
import { apiConfig } from "../authConfig";
const NODE_ENV = import.meta.env.MODE;

class TestApiService {
	constructor() {
		this.service = axios.create({
			baseURL:
				NODE_ENV === "development"
					? "http://localhost:8081/api/test"
					: "https://henwood.azurewebsites.net/api/test",
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	async callProtected(instance, isAuthenticated) {
		if (!isAuthenticated)
			return { message: "This resource requires authentication" };

		const account = instance.getAllAccounts()[0];

		try {
			const tokenResponse = await instance.acquireTokenSilent({
				...apiConfig,
				account
			});

			const { data } = await this.service.get("/protected", {
				headers: {
					Authorization: "Bearer " + tokenResponse.accessToken
				}
			});
			return data;
		} catch (error) {
			return error;
		}
	}

	async callNonProtected() {
		console.log(NODE_ENV);
		try {
			const { data } = await this.service.get("/nonprotected");
			return data;
		} catch (error) {
			return error;
		}
	}
}

export const testApiService = new TestApiService();
