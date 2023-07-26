import axios from "axios";
import { apiConfig } from "../authConfig";
const isDev = import.meta.env.DEV;
const baseURL = isDev ? "http://localhost:8081/api/test" : "/api/test";
const headers = { "Content-Type": "application/json" };

export default class TestApiService {
	constructor(msalInstance, account) {
		this.msalInstance = msalInstance;
		this.account = account;
		this.service = axios.create({
			baseURL,
			headers
		});
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

	async callProtected() {
		const accessToken = await this.getAccessToken();
		try {
			const { data } = await this.service.get("/protected", {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			return data;
		} catch (error) {
			const { data } = error.response;
			return data;
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
