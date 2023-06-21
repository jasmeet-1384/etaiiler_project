import Follow from '../models/follow.model';
import {getUserDetails} from './getNotification.service'

var Mongoose = require('mongoose');

export const addFollow = async (req) => {
    try {
        let newFollow = new Follow({
            ...req
        })
        const addFollowDetails = await newFollow.save()
        return {
            message: "followed successfully",
            code: 201,
            data: addFollowDetails
        }
    } catch (error) {
        throw (error)
    }

};

export const removeFollow = async (req) => {
    try {
        await Follow.remove({ followingWhom: Mongoose.Types.ObjectId(req.followingWhom) })
        return {
            message: "deleted successfully",
            code: 201,
        }
    } catch (error) {
        throw (error)

    }
};

export const getFollow = async (req) => {
    try {
        let getFollowList = await Follow.find({ whoIsFollowing: Mongoose.Types.ObjectId(req.whoIsFollowing) })
        return {
            message: "fetched following list successfully",
            data : getFollowList,
            code: 201,
        }
    } catch (error) {
        throw (error)

    }
};


export const getFollowersList = async (req) => {
    try {
        let followerList = []
        let getFollowersList = await Follow.find({ followId: Mongoose.Types.ObjectId(req.user_id) })
        for(let i=0 ; i < getFollowersList.length ; i++){
            // console.log("===>>>>>>>>>>",await getUserDetails(getFollowersList[i].user_id))
            let a = await getUserDetails(getFollowersList[i].user_id)
            followerList.push(a)
        }
        return {
            message: "following list successfully",
            data : followerList,
            code: 201,
        }
    } catch (error) {
        throw (error)

    }
};

export const getFollowingList = async (req) => {
    try {
        let followerList = []
        let getFollowersList = await Follow.find({ user_id: Mongoose.Types.ObjectId(req.user_id) })
        for(let i=0 ; i < getFollowersList.length ; i++){
            let a = await getUserDetails(getFollowersList[i].followId)
            followerList.push(a)
        }
        return {
            message: "following list successfully",
            data : followerList,
            code: 201,
        }
    } catch (error) {
        throw (error)

    }
};
