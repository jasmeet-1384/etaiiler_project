import express from 'express';
import * as notificationController from '../controllers/notification.controller';

const router = express.Router();

router.post('/getNotifications', notificationController.getNotifications);

export default router;