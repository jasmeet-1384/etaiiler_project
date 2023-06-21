import express from 'express';
import * as chatController from '../controllers/chat.controller';

const router = express.Router();

router.post('/addChat', chatController.addConversation);
router.post('/getMyConversation', chatController.getMyConversation);
router.post('/getMyMessages', chatController.getMyMessages);
router.post('/getParticularConversationId', chatController.getParticularConversationId);
// router.post('/getFollow', followController.getFollow);



export default router;