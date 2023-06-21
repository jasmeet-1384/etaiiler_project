/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { generateUploadUrl } from '../services/s3.service';

const router = express.Router();

//route to get all users
router.post('/userRegister', userController.userResgister);
router.post('/resetPassword', userController.resetPassword);

//route to create a new user
router.post('/userLogin', userController.userLogin);
// route to update the token
router.post('/userTokenUpdate', userController.userTokenUpdate);
router.post('/profileUpdate', userController.profileUpdate);

//route for generating otp
router.post('/userOtp', userController.userOtp);
router.post('/getUser', userController.getUser);
router.post('/getBusiness', userController.getBusiness);

router.post('/followUser', userController.followUser);
router.post('/unfollowUser', userController.unfollowUser);


//route for generating otp
router.post('/userOtpVerification', userController.userOtpVerification);

router.post('/getAllUser', userController.getAllUsers)
router.post('/getAllUsersAndBusiness', userController.getAllUsersAndBusiness)
router.post('/searchProfile', userController.searchProfile)


router.post('/followUser',userController.followUser);
router.post('/unfollowUser',userController.unfollowUser);
router.post('/getGpsAddressDetails',userController.getGpsAddressDetails);
router.post('/addNewAddress',userController.addNewAddress);
router.post('/getUserAddresses',userController.getUserAddresses);
router.post('/sendSupportMessage',userController.sendSupportMessage);
router.post('/getProfileDetails',userController.getProfileDetails);
router.post('/deleteProfile',userController.deleteProfile);
router.post('/getBusinessProfileById',userController.getBusinessProfileById);
router.post('/getUserProfileById',userController.getUserProfileById);


router.get('/s3Url',async (req,res) => {
    const url = await generateUploadUrl()
    res.send({url})
  })
export default router;
