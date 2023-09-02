import axios from "axios";

const baseURL = "https://trekyaari-server-prod-ske6q.ondigitalocean.app";
// const baseURL = "http://192.168.1.8:3001";

export const api = axios.create({
	baseURL,
});