import nock from 'nock';
const host = 'http://localhost:8080';

export class ApiMockUtil {
	static defaultHeaders() {
		return {
			Accept: 'application/json, text/plain',
			'Content-Type': 'application/json',
			datatype: 'json',
			json: true
		};
	}

	static defaultResponseHeaders() {
		return {
			Accept: 'application/json, text/plain',
			'Content-Type': 'application/json'
		};
	}

	static resolveRequestHeaders(reqHeaders, overrideHeaders) {
		if (!overrideHeaders) {
			overrideHeaders = false;
		}

		let headers = ApiMockUtil.defaultHeaders();
		if (reqHeaders) {
			if (overrideHeaders) {
				headers = reqHeaders;
			} else {
				headers = Object.assign({}, headers, reqHeaders);
			}
		}

		return headers;
	}

	static resolveResponseHeaders(respHeaders, overrideHeaders) {
		if (!overrideHeaders) {
			overrideHeaders = false;
		}

		let responseHeaders = ApiMockUtil.defaultResponseHeaders();
		if (respHeaders) {
			responseHeaders = overrideHeaders
				? respHeaders
				: Object.assign({}, responseHeaders, respHeaders);
		}

		return responseHeaders;
	}

	static mockGet(
		route,
		queryparams,
		mockresponsecode,
		mockresponse,
		reqHeaders,
		overrideHeaders
	) {
		const headers = ApiMockUtil.resolveRequestHeaders(
			reqHeaders,
			overrideHeaders
		);
		return nock(host, headers)
			.log(console.log)
			.get(route)
			.query(queryparams)
			.reply(mockresponsecode, mockresponse);
	}

	static mockPut(route, params, mockresponsecode, mockresponse) {
		if (params !== null) {
			return nock(host)
				.log(console.log)
				.put(route, params)
				.reply(mockresponsecode, mockresponse);
		} else {
			return nock(host)
				.log(console.log)
				.put(route)
				.reply(mockresponsecode, mockresponse);
		}
	}

	static mockPost(
		route,
		params,
		mockresponsecode,
		mockresponse,
		reqHeaders,
		overrideHeaders,
		respHeaders
	) {
		const headers = ApiMockUtil.resolveRequestHeaders(
			reqHeaders,
			overrideHeaders
		);
		const responseHeaders = ApiMockUtil.resolveResponseHeaders(
			respHeaders,
			overrideHeaders
		);

		return nock(host)
			.log(console.log)
			.defaultReplyHeaders(responseHeaders)
			.post(route, params, headers)
			.reply(mockresponsecode, mockresponse);
	}

	static mockDelete(
		route,
		params,
		mockresponsecode,
		mockresponse,
		reqHeaders,
		overrideHeaders
	) {
		const headers = ApiMockUtil.resolveRequestHeaders(
			reqHeaders,
			overrideHeaders
		);
		return nock(host, headers)
			.log(console.log)
			.delete(route, params)
			.reply(mockresponsecode, mockresponse);
	}

	static cleanAll() {
		return nock.cleanAll();
	}

	static disableNetConnect() {
		return nock.disableNetConnect();
	}
}
