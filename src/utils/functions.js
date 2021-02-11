require('dotenv').config();

export const getPort = () =>
	process.env.PORT ? process.env.PORT : process.env.DEV_PORT;
