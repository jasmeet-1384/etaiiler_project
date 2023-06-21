import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import businessRoute from './business.route'
import postRoute from './post.route'
import followRoute from './follow.route'
import notificationRoute from './notification.route'
import chatRoute from './chat.route'
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.use('/users', userRoute);
  router.use('/business', businessRoute);
  router.use('/post', postRoute);
  router.use('/follow', followRoute);
  router.use('/notification', notificationRoute);
  router.use('/chat', chatRoute);
  router.get('/serverTest', (req,res) => {
    console.log("hi server started")
    return res.json({message : "server started"})
  })
  return router;
};

export default routes;
