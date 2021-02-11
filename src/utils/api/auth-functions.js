import axios from 'axios';
import qs from 'qs';
import { AUTH_ERRORS, exchangeAccessTokenHandler } from '../../handlers';

export const exchangeAccessToken = async (
	url,
	code,
	CLIENT_ID,
	CLIENT_SECRET
) => {
	try {
		const value = await new Promise((resolve, reject) => {
			const data = qs.stringify({
				grant_type: 'authorization_code',
				code: code,
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET
			});
			const config = {
				method: 'post',
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			};

			axios(config)
				.then((response) => {
					resolve(JSON.stringify(response.data));
				})
				.catch((error) => {
					if (
						error.hasOwnProperty('response') &&
						error.response.hasOwnProperty('data') &&
						error.response.data.hasOwnProperty('error')
					) {
						reject(error.response.data.error);
					} else {
						reject(AUTH_ERRORS.GENERIC);
					}
				});
		});
		return value;
	} catch (err) {
		return exchangeAccessTokenHandler(err);
	}
};

export const refreshToken = async (url, token, CLIENT_ID, CLIENT_SECRET) => {
	try {
		const value = await new Promise((resolve, reject) => {
			const data = qs.stringify({
				grant_type: 'refresh_token',
				refresh_token: token,
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET
			});
			const config = {
				method: 'post',
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: data
			};

			axios(config)
				.then((response) => {
					resolve(JSON.stringify(response.data));
				})
				.catch((error) => {
					if (
						error.hasOwnProperty('response') &&
						error.response.hasOwnProperty('data') &&
						error.response.data.hasOwnProperty('error')
					) {
						reject(error.response.data.error);
					} else {
						reject(AUTH_ERRORS.GENERIC);
					}
				});
		});
		return value;
	} catch (err) {
		return exchangeAccessTokenHandler(err);
	}
};
