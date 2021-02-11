import ApiMockUtil from './ApiMockUtil';
import nock from 'nock';

describe('ApiMockUtil Test - ', () => {
	const route = '/test';
	const responseCode = 200;
	const response = {
		data: 'test'
	};

	it('should test defaultHeaders()', () => {
		const headers = ApiMockUtil.defaultHeaders();
		expect(headers['Content-Type']).toEqual('application/json');
	});

	it('should test defaultResponseHeaders()', () => {
		const headers = ApiMockUtil.defaultResponseHeaders();
		expect(headers).toEqual({
			Accept: 'application/json, text/plain',
			'Content-Type': 'application/json'
		});
	});

	it('should test resolveRequestHeaders() when overriding headers', () => {
		const headers = ApiMockUtil.resolveRequestHeaders(
			{ 'Content-Type': 'application/octet-stream' },
			true
		);
		expect(headers).toEqual({
			'Content-Type': 'application/octet-stream'
		});
	});

	it('should test resolveRequestHeaders() when not overriding headers', () => {
		const headers = ApiMockUtil.resolveRequestHeaders(
			{ 'Content-Type': 'application/octet-stream' },
			false
		);
		expect(headers).toEqual({
			Accept: 'application/json, text/plain',
			'Content-Type': 'application/octet-stream',
			datatype: 'json',
			json: true
		});
	});

	it('should test resolveRequestHeaders() if request headers are not existing', () => {
		const headers = ApiMockUtil.resolveRequestHeaders();
		expect(headers).toEqual({
			Accept: 'application/json, text/plain',
			'Content-Type': 'application/json',
			datatype: 'json',
			json: true
		});
	});

	it('should test resolveResponseHeaders() when overriding headers', () => {
		const headers = ApiMockUtil.resolveResponseHeaders(
			{ 'Content-Type': 'application/octet-stream' },
			true
		);
		expect(headers).toEqual({
			'Content-Type': 'application/octet-stream'
		});
	});

	it('should test resolveResponseHeaders() when not overriding headers', () => {
		const headers = ApiMockUtil.resolveResponseHeaders(
			{ 'Content-Type': 'application/octet-stream' },
			false
		);
		expect(headers).toEqual({
			Accept: 'application/json, text/plain',
			'Content-Type': 'application/octet-stream'
		});
	});

	it('should test resolveResponseHeaders() if response headers are not existing', () => {
		const headers = ApiMockUtil.resolveResponseHeaders();
		expect(headers).toEqual({
			Accept: 'application/json, text/plain',
			'Content-Type': 'application/json'
		});
	});

	it('should test cleanAll()', () => {
		nock.cleanAll = jest.fn();
		ApiMockUtil.cleanAll();
		expect(nock.cleanAll).toBeCalled();
	});

	it('should test disableNetConnect()', () => {
		nock.disableNetConnect = jest.fn();
		ApiMockUtil.disableNetConnect();
		expect(nock.disableNetConnect).toBeCalled();
	});

	it('should test mockGet() success response', () => {
		const result = ApiMockUtil.mockGet(
			route,
			{ id: 1 },
			responseCode,
			response
		);
		expect(result.interceptors[0].statusCode).toEqual(200);
		expect(result.interceptors[0].body).toEqual('{"data":"test"}');
	});

	it('should test mockGet() error response', () => {
		const responseCode = 400;
		const response = { message: 'Server error' };
		const result = ApiMockUtil.mockGet(
			route,
			{ id: 1 },
			responseCode,
			response
		);
		expect(result.interceptors[0].statusCode).toEqual(400);
		expect(result.interceptors[0].body).toEqual(
			'{"message":"Server error"}'
		);
	});

	it('should test mockPut() when params are existing', () => {
		const result = ApiMockUtil.mockPut(
			route,
			{ id: 1 },
			responseCode,
			response
		);
		expect(result.interceptors[0].statusCode).toEqual(200);
		expect(result.interceptors[0].body).toEqual('{"data":"test"}');
	});

	it('should test mockPut() when params are not existing', () => {
		const result = ApiMockUtil.mockPut(route, null, responseCode, response);
	});

	it('should test mockPost() when params are not existing', () => {
		const result = ApiMockUtil.mockPost(
			route,
			{ id: 1 },
			responseCode,
			response
		);
		expect(result.interceptors[0].statusCode).toEqual(200);
		expect(result.interceptors[0].body).toEqual('{"data":"test"}');
	});

	it('should test mockDelete() when params are not existing', () => {
		const result = ApiMockUtil.mockDelete(route, { id: 1 }, responseCode);
		expect(result.interceptors[0].statusCode).toEqual(200);
		expect(result.interceptors[0].body).toBeUndefined();
	});
});
