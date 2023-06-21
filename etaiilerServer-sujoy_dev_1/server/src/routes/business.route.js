import express from 'express';
import * as businessController from '../controllers/business.controller';

const router = express.Router();

router.post('/businessRegister', businessController.businessResgister);

router.post('/getAllBusiness', businessController.getAllBusiness)


export default router;

