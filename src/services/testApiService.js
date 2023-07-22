import axios from "axios";
import { loginRequest } from "../authConfig";

class TestApiService {
	constructor() {
		this.service = axios.create({
			baseURL: "http://localhost:8081/api/test",
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
				...loginRequest,
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
		try {
			const { data } = await this.service.get("/nonprotected");
			return data;
		} catch (error) {
			return error;
		}
	}
}

export const testApiService = new TestApiService();
