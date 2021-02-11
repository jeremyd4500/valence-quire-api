import express from 'express';
import { exchangeAccessToken } from '../utils';
import {
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URL,
	AUTH_URL,
	TOKEN_URL
} from '../constants';
import DB from '../db';

const router = express.Router();

router.get('/initialize', (req, res) => {
	const authURL =
		AUTH_URL +
		'?client_id=' +
		CLIENT_ID +
		'&redirect_uri=' +
		encodeURIComponent(REDIRECT_URL);
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(
		'<html><body>' +
			'<a href="' +
			authURL +
			'">Connect Quire</a>' +
			'</body></html>'
	);
	res.end();
});

router.get('/callback', async (req, res) => {
	if (req.query.code) {
		const accessObj = await exchangeAccessToken(
			TOKEN_URL,
			req.query.code,
			CLIENT_ID,
			CLIENT_SECRET
		);
		if (accessObj && typeof accessObj === 'string') {
			DB.saveAccessObject(JSON.parse(accessObj));
		}
	}
	res.sendStatus(200);
});

module.exports = router;
