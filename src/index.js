import '@babel/core';
import '@babel/polyfill';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import { getPort } from './utils';

require('dotenv').config();
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', require('./api/auth'));
app.use('/projects', require('./api/projects'));

app.use('/', (req, res, next) => {
	res.send('Welcome to the Valence Quire API');
});

const server = {
	name: 'Valence Quire API',
	port: getPort(),
	version: '1.0.0'
};

app.listen(server.port, () => {
	console.log(`${server.name} listening on port ${server.port}`);
});
