import express from 'express';
import { getAllProjects } from '../utils';
import { ORG_ID } from '../constants';
import DB from '../db';

const router = express.Router();

router.get('/all', async (req, res, next) => {
	const accessObj = await DB.getAccessObject();
});

module.exports = router;
