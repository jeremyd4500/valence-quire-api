import keyMirror from 'keymirror';

export const AUTH_ERRORS = keyMirror({
	GENERIC: null,
	INVALID_GRANT: null,
	UNSUPPORTED_GRANT_TYPE: null
});

export const exchangeAccessTokenHandler = (error) => {
	if (error && typeof error === 'string') {
		let output = {};
		switch (error.toUpperCase()) {
			case AUTH_ERRORS.UNSUPPORTED_GRANT_TYPE: {
				output.error = 'unsupported grant type';
				break;
			}
			case AUTH_ERRORS.INVALID_GRANT: {
				output.error = 'invalid grant';
				break;
			}
			case AUTH_ERRORS.GENERIC: {
				output.error = 'generic';
				break;
			}
			default: {
				break;
			}
		}
		return output;
	}
};
