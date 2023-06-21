import User from '../models/user.model';
import Business from '../models/business.model';
import Otp from '../models/otp.model';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
var Mongoose = require('mongoose');
import otpGenerator from 'otp-generator';
import notificationService from './notification.service';
import Support from '../models/supportChat.model';
import { getUserDetails } from './getNotification.service';
import axios from 'axios';
import hashTagModel from '../models/hashTag.model';
//include models for deletion
import Post from '../models/post.model';
import Follow from '../models/follow.model';
import Following from '../models/following.model';
import Likes from '../models/likes.model';
import Comments from '../models/comments.model';
import Address from '../models/address.model';
import Share from '../models/share.model';
//get all users
export const userResgister = async (req) => {
  console.log(req);
  let userData = await User.find({ phoneNumber: req.phoneNumber });
  if (!userData.length) {
    const passwordHash = await bcrypt.hash(req.password, 10);
    req.password = passwordHash;
    let newUser = new User({
      ...req
    });

    const userDetails = await newUser.save();

    let newAddress = new Address({
      user_id: newUser._id,
      role: req.role,
      latitude: req.latitude,
      longitude: req.longitude,
      active: req.active,
      addressLine1: req.addressLine1,
      addressLine2: req.addressLine2
    });

    const addressDetails = await newAddress.save();
    const updateGps = await User.updateOne(
      {
        _id: Mongoose.Types.ObjectId(newUser._id)
      },
      {
        $set: {
          gpsAddress: newAddress._id
        }
      }
    );
    return {
      message: 'added successfully',
      code: 201,
      data: userDetails
    };
  } else
    return {
      message: 'user already registered',
      code: 400,
      data: {}
    };
};

export const resetPassword = async (req) => {
  let userData = await User.find({ phoneNumber: req.phoneNumber });
  let businessData = await Business.find({ phoneNumber: req.phoneNumber });
  if (userData.length > 0) {
    const passwordHash = await bcrypt.hash(req.password, 10);
    req.password = passwordHash;
    const updatePassword = await User.updateOne(
      {
        phoneNumber: req.phoneNumber
      },
      {
        $set: {
          password: req.password
        }
      }
    );

    return {
      message: 'updated successfully',
      code: 201,
      data: updatePassword
    };
  } else {
    const passwordHash = await bcrypt.hash(req.password, 10);
    req.password = passwordHash;
    const updatePassword = await Business.updateOne(
      {
        phoneNumber: req.phoneNumber
      },
      {
        $set: {
          password: req.password
        }
      }
    );
    return {
      message: 'updated successfully',
      code: 201,
      data: updatePassword
    };
  }
};

//user login
export const userLogin = async (req, res) => {
  let userData = await User.findOne({ phoneNumber: req.phoneNumber })
    .populate('gpsAddress', null, 'Address')
    .exec();
  let businessData = await Business.findOne({ phoneNumber: req.phoneNumber })
    .populate('gpsAddress', null, 'Address')
    .exec();
  if (userData) {
    let passwordVerify = await bcrypt.compare(req.password, userData.password);
    if (passwordVerify) {
      const payload = { phoneNumber: userData.phoneNumber };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1d'
      });
      const dataUser = {
        token,
        userData
      };
      return {
        data: dataUser,
        message: 'Login sucess',
        code: 200
      };
    } else
      return {
        data: {},
        message: 'Wrong Password',
        code: 403
      };
  } else if (businessData) {
    let passwordVerify = await bcrypt.compare(
      req.password,
      businessData.password
    );
    if (passwordVerify) {
      const payload = { phoneNumber: businessData.phoneNumber };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1d'
      });
      const dataUser = {
        token,
        businessData
      };
      return {
        data: dataUser,
        message: 'Login sucess',
        code: 200
      };
    } else
      return {
        data: {},
        message: 'Wrong Password',
        code: 403
      };
  } else
    return {
      data: {},
      message: 'phone number not found!! Register first',
      code: 403
    };
};

export const userTokenUpdate = async (req) => {
  try {
    if (req.role === 'user') {
      const updateToken = await User.updateOne(
        {
          _id: Mongoose.Types.ObjectId(req.id)
        },
        {
          $set: {
            fcmToken: req.token,
            os: req.os
          }
        }
      );
      return {
        data: updateToken,
        message: 'Token updated',
        code: 200
      };
    } else {
      const updateToken = await Business.updateOne(
        {
          _id: Mongoose.Types.ObjectId(req.id)
        },
        {
          $set: {
            fcmToken: req.token,
            os: req.os
          }
        }
      );
      return {
        data: updateToken,
        message: 'Token updated',
        code: 200
      };
    }
  } catch (error) {
    console.log('Error => ', error);
  }
};

export const profileUpdate = async (req) => {
  try {
    if (req.role === 'user') {
      let newAddress = new Address({
        user_id: req.user_id,
        role: req.role,
        latitude: req.latitude,
        longitude: req.longitude,
        active: req.active,
        addressLine1: req.addressLine1,
        addressLine2: req.addressLine2
      });
      const addressDetails = await newAddress.save();
      const updateGps = await User.updateOne(
        {
          _id: Mongoose.Types.ObjectId(req.user_id)
        },
        {
          $set: {
            gpsAddress: newAddress._id
          }
        }
      );
      const updateProfile = await User.updateOne(
        {
          phoneNumber: req.phoneNumber
        },
        {
          $set: {
            name: req.name,
            dateOfBirth: req.dateOfBirth,
            bio: req.bio,
            state: req.state,
            city: req.city,
            pincode: req.pincode,
            gender: req.gender,
            image: req.image
          }
        }
      );
      return {
        data: updateProfile,
        message: 'Token updated',
        code: 200
      };
    } else if (req.role == 'business') {
      let newAddress = new Address({
        user_id: req.user_id,
        role: req.role,
        latitude: req.latitude,
        longitude: req.longitude,
        active: req.active,
        addressLine1: req.addressLine1,
        addressLine2: req.addressLine2
      });
      const addressDetails = await newAddress.save();
      const updateGps = await Business.updateOne(
        {
          _id: Mongoose.Types.ObjectId(req.user_id)
        },
        {
          $set: {
            gpsAddress: newAddress._id
          }
        }
      );
      const updateToken = await Business.updateOne(
        {
          phoneNumber: req.phoneNumber
        },
        {
          $set: {
            name: req.name,
            dateOfBirth: req.dateOfBirth,
            state: req.state,
            city: req.city,
            addressLine1: req.addressLine1,
            addressLine2: req.addressLine2,
            pincode: req.pincode,
            productCategory: req.productCategory,
            natureOfBusiness: req.natureOfBusiness,
            website: req.website,
            image: req.image
          }
        }
      );
      return {
        data: updateToken,
        message: 'business updated',
        code: 200
      };
    }
  } catch (error) {
    console.log('Error => ', error);
  }
};

//otp generation
export const userOtp = async (req, res) => {
  let userData = await User.findOne({ phoneNumber: req.phoneNumber });
  let businessData = await Business.findOne({ phoneNumber: req.phoneNumber });
  if (userData) {
    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    });

    console.log(OTP, '<== OTP GENERATED');
    // const salt = await bcrypt.genSalt(10)
    const hashOtp = await bcrypt.hash(OTP, 10);

    const otp = new Otp({
      phoneNumber: req.phoneNumber,
      otp: hashOtp
    });

    const otpDetails = await otp.save();
    console.log(
      's => ',
      `Dear User,\n\nUse the OTP ${OTP} login or reset password to your ii universe account. OTP is valid for 180 seconds. Kindly do not share this OTP.`
    );
    let textLocalClient = axios.create({
      baseURL: 'https://api.textlocal.in/',
      params: {
        apiKey: 'NTEzODc5NDUzMTU4NDE1MDY5MzI3MDM2Nzg3NzQ3NmM=', //Text local api key
        sender: 'HAASTG'
      }
    });
    let params = new URLSearchParams();
    params.append('numbers', [parseInt('91' + req.phoneNumber)]);
    params.append(
      'message',
      `Use the OTP ${OTP} for login or reset password to your Haastag account. OTP is valid for 180 seconds. Please do not share this OTP. -Haastag`
    );
    let textLocalResponse = await textLocalClient.post('/send', params);
    console.log(textLocalResponse.data);
    return {
      message: 'otp send successfully',
      code: 201,
      data: otpDetails
    };
  } else if (businessData) {
    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    });

    console.log(OTP, '<== OTP GENERATED');
    // const salt = await bcrypt.genSalt(10)
    const hashOtp = await bcrypt.hash(OTP, 10);

    const otp = new Otp({
      phoneNumber: req.phoneNumber,
      otp: hashOtp
    });

    const otpDetails = await otp.save();
    console.log(
      's => ',
      `Dear User,\n\nUse the OTP ${OTP} login or reset password to your ii universe account. OTP is valid for 180 seconds. Kindly do not share this OTP.`
    );
    let textLocalClient = axios.create({
      baseURL: 'https://api.textlocal.in/',
      params: {
        apiKey: 'NTEzODc5NDUzMTU4NDE1MDY5MzI3MDM2Nzg3NzQ3NmM=', //Text local api key
        sender: 'HAASTG'
      }
    });
    let params = new URLSearchParams();
    params.append('numbers', [parseInt('91' + req.phoneNumber)]);
    params.append(
      'message',
      `Use the OTP ${OTP} for login or reset password to your Haastag account. OTP is valid for 180 seconds. Please do not share this OTP. -Haastag`
    );
    let textLocalResponse = await textLocalClient.post('/send', params);
    console.log(textLocalResponse.data);
    return {
      message: 'otp send successfully',
      code: 201,
      data: otpDetails
    };
  } else
    return {
      data: {},
      message: 'Phone number not found!! Register first',
      code: 403
    };
};

//otp verification
export const userOtpVerification = async (req, res) => {
  let otpData = await Otp.find({ phoneNumber: req.phoneNumber });
  let userData = await User.findOne({ phoneNumber: req.phoneNumber })
    .populate('gpsAddress', null, 'Address')
    .exec();
  let businessData = await Business.findOne({ phoneNumber: req.phoneNumber })
    .populate('gpsAddress', null, 'Address')
    .exec();
  console.log(otpData);
  if (otpData && userData) {
    const rightOtpFind = otpData[otpData.length - 1];
    const validUser = await bcrypt.compare(req.otp, rightOtpFind.otp);
    if (rightOtpFind.phoneNumber === req.phoneNumber && validUser) {
      const payload = { phoneNumber: otpData.phoneNumber };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1d'
      });
      const otpVerification = {
        token,
        userData
      };
      return {
        data: otpVerification,
        message: 'Login sucess',
        code: 200
      };
    } else
      return {
        data: {},
        message: 'Wrong Otp',
        code: 403
      };
  } else if (otpData && businessData) {
    // const payload = { phoneNumber: otpData.phoneNumber }
    // const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" })
    // const otpVerification = {
    //   token,
    //   businessData
    // }
    // return {
    //   data: otpVerification,
    //   message: "Login sucess",
    //   code: 200
    // }
    const rightOtpFind = otpData[otpData.length - 1];
    const validUser = await bcrypt.compare(req.otp, rightOtpFind.otp);
    if (rightOtpFind.phoneNumber === req.phoneNumber && validUser) {
      const payload = { phoneNumber: otpData.phoneNumber };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1d'
      });
      const otpVerification = {
        token,
        businessData
      };
      return {
        data: otpVerification,
        message: 'Login sucess',
        code: 200
      };
    } else
      return {
        data: {},
        message: 'Wrong Otp',
        code: 403
      };
  } else
    return {
      data: {},
      message: 'Phone number not found!! Register first',
      code: 403
    };
};

//get all users
export const getAllUsers = async (req) => {
  try {
    const users = await User.find()
      .populate('gpsAddress', null, 'Address')
      .exec();
    return {
      message: 'users fetched successfully',
      code: 201,
      data: users
    };
  } catch (error) {
    throw error;
  }
};

//get all users & business
export const getAllUsersAndBusiness = async (req) => {
  try {
    const users = await User.find()
      .populate('gpsAddress', null, 'Address')
      .exec();
    const business = await Business.find()
      .populate('gpsAddress', null, 'Address')
      .exec();

    const allProfiles = [...users, ...business];
    return {
      message: 'users fetched successfully',
      code: 201,
      data: allProfiles
    };
  } catch (error) {
    throw error;
  }
};

//get all users & business
export const searchProfile = async (req) => {
  try {
    var regex = new RegExp(req.name);
    const users = await User.find({ name: regex })
      .populate('gpsAddress', null, 'Address')
      .exec();
    const business = await Business.find({ name: regex })
      .populate('gpsAddress', null, 'Address')
      .exec();

    const allProfiles = [...users, ...business];
    return {
      message: 'users fetched successfully',
      code: 201,
      data: allProfiles
    };
  } catch (error) {
    throw error;
  }
};

export const searchHash = async (req) => {
  try {
    var regex = new RegExp(req.name);

    // const business = await Business.find({ name: regex }).populate('gpsAddress', null, 'Address').exec()
    const users = await hashTagModel.aggregate([
      {
        $match: {
          hashTag: regex
        }
      },
      {
        $group: {
          _id: '$hashTag',
          count: { $sum: 1 },
          postId: { $first: '$postId' }
        }
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'postId',
          foreignField: '_id',
          as: 'postDetails'
        }
      }
    ]);
    const allProfiles = [...users];
    return {
      message: 'hashes fetched successfully',
      code: 201,
      data: allProfiles
    };
  } catch (error) {
    throw error;
  }
};
//follow user
export const followUser = async (req) => {
  console.log('Follow ID => ', req.followId, req.user_id, req.role);
  try {
    let user_details = await getUserDetails(req.user_id);
    let followId_details = await getUserDetails(req.followId);
    if (followId_details.followers.some((el) => el == req.user_id)) {
      return {
        message: 'followed already',
        code: 201,
        data: {}
      };
    } else {
      let updateFollowerOfUserBeingFollowed = await User.findByIdAndUpdate(
        req.followId,
        {
          $push: { followers: req.user_id }
        },
        { new: true }
      ).exec();

      let updateFollowingOfLoggedInUser = await User.findByIdAndUpdate(
        req.user_id,
        {
          $push: { following: req.followId }
        },
        { new: true }
      ).exec();

      let updateFollowerOfBusinessBeingFollowed =
        await Business.findByIdAndUpdate(
          req.followId,
          {
            $push: { followers: req.user_id }
          },
          { new: true }
        ).exec();

      let updateFollowingOfLoggedInBusiness = await Business.findByIdAndUpdate(
        req.user_id,
        {
          $push: { following: req.followId }
        },
        { new: true }
      ).exec();

      let newFollow = new Follow({
        ...req
      });
      const addFollowDetails = newFollow.save();

      let followIDDetails = {};

      followIDDetails = await Business.findOne({
        _id: Mongoose.Types.ObjectId(req.followId)
      });
      if (followIDDetails == null) {
        followIDDetails = await User.findOne({
          _id: Mongoose.Types.ObjectId(req.followId)
        });
        notificationService.notify(
          followIDDetails.fcmToken,
          'follow',
          user_details.name
        );
      } else {
        notificationService.notify(
          followIDDetails.fcmToken,
          'follow',
          user_details.name
        );
      }
      return {
        message: 'followed successfully',
        code: 201,
        data: updateFollowingOfLoggedInUser
      };
    }
  } catch (error) {
    throw error;
  }
};

//unfollow user
export const unfollowUser = async (req) => {
  try {
    let updateFollowerOfUserBeingFollowed = await User.findByIdAndUpdate(
      req.followId,
      {
        $pull: { followers: req.user_id }
      },
      { new: true }
    ).exec();
    let updateFollowingOfLoggedInUser = await User.findByIdAndUpdate(
      req.user_id,
      {
        $pull: { following: req.followId }
      },
      { new: true }
    ).exec();
    let updateFollowerOfBusinessBeingFollowed =
      await Business.findByIdAndUpdate(
        req.followId,
        {
          $pull: { followers: req.user_id }
        },
        { new: true }
      ).exec();
    let updateFollowingOfLoggedInBusiness = await Business.findByIdAndUpdate(
      req.user_id,
      {
        $pull: { following: req.followId }
      },
      { new: true }
    ).exec();

    await Follow.remove({ followId: Mongoose.Types.ObjectId(req.followId) });
    return {
      message: 'unfollowed successfully',
      code: 201,
      data: updateFollowingOfLoggedInUser
    };
  } catch (error) {
    throw error;
  }
};

//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
export const getBusiness = async (id) => {
  const data = await Business.findById(id)
    .populate('gpsAddress', null, 'Address')
    .exec();
  return data;
};

export const getGpsAddressDetails = async (req) => {
  try {
    if (req.role == 'user') {
      let userData = await User.findOne({ phoneNumber: req.phoneNumber })
        .populate('gpsAddress', null, 'Address')
        .exec();
      return {
        message: 'gps fetched successfully',
        code: 201,
        data: userData
      };
    } else {
      let businessData = await Business.findOne({
        phoneNumber: req.phoneNumber
      })
        .populate('gpsAddress', null, 'Address')
        .exec();
      return {
        message: 'gps fetched successfully',
        code: 201,
        data: businessData
      };
    }
  } catch (error) {
    throw error;
  }
};

export const addNewAddress = async (req) => {
  try {
    let newAddress = new Address({
      user_id: req.user_id,
      role: req.role,
      latitude: req.latitude,
      longitude: req.longitude,
      active: req.active,
      addressLine1: req.addressLine1,
      addressLine2: req.addressLine2
    });

    const addressDetails = await newAddress.save();

    return {
      message: 'new address added successfully',
      code: 201,
      data: addressDetails
    };
  } catch (error) {
    throw error;
  }
};

export const getUserAddresses = async (req) => {
  try {
    let address = await Address.find({ user_id: req.user_id });

    return {
      message: 'addresses fetched successfully',
      code: 201,
      data: address
    };
  } catch (error) {
    console.log(error);
  }
};

export const sendSupportMessage = async (req) => {
  try {
    let newMsg = new Support({
      ...req
    });
    const msgDetails = await newMsg.save();
    return {
      message: 'support chat sent successfully',
      code: 201,
      data: msgDetails
    };
  } catch (error) {
    console.log(error);
  }
};

export const getProfileDetails = async (req) => {
  try {
    let user_details = await getUserDetails(req.user_id);

    return {
      message: 'user details fetched successfully',
      code: 201,
      data: user_details
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = async (req) => {
  try {
    let user_details = await getUserDetails(req.user_id);
    if(user_details.role == 'business'){
      let removeBusiness = await Business.deleteOne({_id : req.user_id})
    }else if(user_details.role == 'user'){
      let removeUser = await Business.deleteOne({_id : req.user_id})
    }
    let posts = await Post.deleteMany({user_id : req.user_id})
    let followers = await Follow.deleteMany({user_id : req.user_id})
    let following = await Following.deleteMany({user_id : req.user_id})
    let likes = await Likes.deleteMany({user_id : req.user_id})
    let comments = await Comments.deleteMany({user_id : req.user_id})
    let address = await Address.deleteMany({user_id : req.user_id})//multiple
    let shares = await Share.deleteMany({user_id : req.user_id})
    return {
      message: 'profile deleted successfully',
      code: 201,
      data: user_details
    };
  } catch (error) {
    console.log(error);
  }
};

export const getBusinessProfileById = async (req) => {
  try {
   let profileDetails = await Business.findById(req.user_id).populate('gpsAddress', null, 'Address')
   .exec();
   return {
    message: 'user details fetched successfully',
    code: 201,
    data: profileDetails
  };
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfileById = async (req) => {
  try {
   let profileDetails = await User.findById(req.user_id).populate('gpsAddress', null, 'Address')
   .exec();
   return {
    message: 'user details fetched successfully',
    code: 201,
    data: profileDetails
  };
  } catch (error) {
    console.log(error);
  }
};
