import express from 'express';
import * as followController from '../controllers/follow.controller';

const router = express.Router();

router.post('/addFollow', followController.addFollow);
router.post('/removeFollow', followController.removeFollow);
router.post('/getFollow', followController.getFollow);
router.post('/getFollowersList', followController.getFollowersList);
router.post('/getFollowingList', followController.getFollowingList);

export default router;