import express from 'express';
import * as postController from '../controllers/post.controller';

const router = express.Router();

router.post('/addPost', postController.addPost);
router.post('/getAllPosts', postController.getAllPosts);
router.post('/getAllPostsHome', postController.getAllPostsHome);
router.post('/getOwnPosts', postController.getOwnPosts);
router.post('/getOwnPostsCounts', postController.getOwnPostsCounts);
router.post('/removePost', postController.removePost);
router.post('/getRelatedPosts', postController.relatedPosts)

router.post('/addPostLike', postController.addPostLike);
router.post('/removePostLike', postController.removePostLike);
router.post('/getPostLikes', postController.getPostLikes);
router.post('/getAllPostLikes', postController.getAllPostLikes);
router.post('/getPostLikeCount', postController.getPostLikeCount);


router.post('/addComment', postController.addPostComment);
router.post('/getPostComment', postController.getPostComment);
router.post('/getPostCommentCount', postController.getPostCommentCount);
router.post('/removePostComment', postController.removePostComment);
router.post('/getLikesByUser', postController.getLikesByUser);
router.post('/sharePosts', postController.sharePosts);
router.post('/getPostShares', postController.getPostShares);
router.post('/getPostTags', postController.getPostTags);
router.post('/addHidePost', postController.addHidePost);
router.post('/getHiddenPosts', postController.getHiddenPosts);
router.post('/reportPosts', postController.reportPosts);
router.post('/deletePosts', postController.deletePosts);
router.post('/getPromoPosts', postController.getPromoPosts);
router.post('/getPromoPlans', postController.getPromoPlans);
router.post('/getDiscountPlans', postController.getDiscountPlans);
router.post('/getPayment', postController.getPayment);
router.post('/getPaymentOrderId', postController.getPaymentOrderId);
router.post('/getRazorpayDetails', postController.getRazorpayDetails);
router.post('/getPostById', postController.getPostById)
router.get('/sharePost/post/:id', postController.sharePost)



export default router;