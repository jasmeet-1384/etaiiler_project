/* eslint-disable prettier/prettier */
import Comment from '../models/comments.model';
import Like from '../models/likes.model';
import Post from '../models/post.model';
import HashTag from '../models/hashTag.model';
import User from '../models/user.model';
import Business from '../models/business.model';
import Razorpaydetails from '../models/razorpayDetails.model';
import Tag from '../models/tag.model'
import Share from '../models/share.model'
import HidePost from '../models/hidePost.model'
import Report from '../models/report.model'
import notificationService from './notification.service';
import { plans } from '../utils/promoPlan'
import { discountPlan } from '../utils/discountPlan'
import { getUserDetails } from './getNotification.service';
import crypto from 'crypto'
import fetch from 'node-fetch'

const Razorpay = require('razorpay')

var instance = new Razorpay({ key_id: 'rzp_test_Fxjkta891p06jg', key_secret: 'uz8VwOSG8BpmKJNirgAjS4qW' })

var Mongoose = require('mongoose');

export const addPost = async (req) => {
    try {
        let newPost = new Post({
            ...req
        })
        const postDetails = await newPost.save()

        for (let i = 0; i < req.tagged_id.length; i++) {
            let newTag = new Tag({
                user_id: req.tagged_id[i],
                postId: newPost._id,
                role: req.role
            })
            const tagDetails = await newTag.save()
            let tag = {
                taggedPerson: req.tagged_id[i]
            }
            let postTag = await Post.updateOne({ _id: newPost._id }, {
                $push: { tags: tag }
            }, { new: true }).exec()
        }

        let allHashes = req.hashTags?.split('#')
        // remove hashes with 0 chars and spaces
        let filteredHashes = allHashes.map(x => x.trim()).filter(y => y.length > 0).map(z => {
            return { postId: postDetails._id, hashTag: z }
        })
        console.log("hashtags => ", filteredHashes)
        let b = await HashTag.insertMany(filteredHashes)
        // let newTag = new Tag({
        console.log(b)
        //     tagged_id : req.tagged_id,
        //     postId : newPost._id,
        //     role: req.role
        // })
        // const tagDetails = await newTag.save()
        // let tag = {
        //     taggedPerson: req.tagged_id
        // }
        // let postTag = await Post.findByIdAndUpdate(newPost._id, {
        //     $push: { tags: tag }
        // }, { new: true }).exec()
        return {
            message: "added successfully",
            code: 201,
            data: postDetails
        }
    } catch (error) {
        throw (error)
    }

};

export const removePost = async (req) => {
    try {
        await Post.remove({ _id: Mongoose.Types.ObjectId(req.post_id) })
        return {
            message: "deleted successfully",
            code: 201,
        }
    } catch (error) {
        throw (error)

    }

};

export const getAllPosts = async (req) => {
    try {
        // const userPosts = await Post.find({ role: "user" }).sort({ "createdAt": -1 }).populate('user_id', null, 'User').exec()
        // const businessPosts = await Post.find({ role: "business" }).sort({ "createdAt": -1 }).populate('user_id', null, 'Business').exec()
        // const combinedPosts = [...userPosts, ...businessPosts]
        // combinedPosts.sort((a, b) => b.createdAt - a.createdAt)
        console.log("trending called")
        let hashTagsOrder = await HashTag.aggregate([
            {
                $group: {
                    _id: "$hashTag",
                    count: { "$sum": 1 }
                }
            },
            {
                $sort: { "count": -1 }
            }
        ])
        let topHashTags = hashTagsOrder.map(x => x._id)
        let topPostBasedOnTags = await HashTag.find({
            hashTag: { $in: topHashTags }
        })
        let topPostIds = topPostBasedOnTags.map(x => Mongoose.Types.ObjectId(x.postId))

        let userPosts = await Post.find({
            $and: [
                {
                    role: "user"
                },
                {
                    _id: {
                        $in: topPostIds
                    }
                }
            ]
        }).populate('user_id', null, 'User')

        let businessPosts = await Post.find({
            $and: [
                {
                    role: "business"
                },
                {
                    _id: {
                        $in: topPostIds
                    }
                }
            ]
        }).populate('user_id', null, 'Business')

        // let topPosts = await Post.find({
        //     $and: [
        //         {role: {$in: ['user', 'business']}},
        //         {_id: { $in: topPostIds}}
        //     ]
        // })
        // .sort({ "createdAt": -1 })
        // .populate('user_id', null, 'User')
        // .populate('user_id', null, 'Business')
        let topPosts = [...userPosts, ...businessPosts]
        topPosts = topPosts.sort((a, b) => b.createdAt - a.createdAt)
        let finalPosts = []
        topPosts.map(pos => {
            let hashes = topPostBasedOnTags.filter(x => x.postId.equals(pos._id)).map(a => a.hashTag)
            // console.log("test => ", pos._doc.user_id)
            let basicDetails = pos._doc
            finalPosts.push({ ...basicDetails, hashTags: hashes, user_id: [basicDetails.user_id] })
        })

        // console.log("posts => ", finalPosts)
        return {
            message: "posts fetched successfully",
            code: 201,
            data: finalPosts
        }
    } catch (error) {
        throw (error)

    }
};

export const getAllPostsHome = async (req) => {
    try {
        let abcd = await Post.aggregate([
            {
                $match: {
                    role: { $in: ['user'] }
                }
            },
            {
                $lookup: {
                    from: 'hashtags',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'hashTags'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_id'
                }
            }
        ])

        let abcd2 = await Post.aggregate([
            {
                $match: {
                    $and: [
                        { role: { $in: ['business'] } },
                        { postType: "" }
                    ]

                }
            },
            {
                $lookup: {
                    from: 'hashtags',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'hashTags'
                }
            },
            {
                $lookup: {
                    from: 'businesses',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_id'
                }
            }
        ])
        // console.log("abcd => ", JSON.stringify(abcd))
        // const userPosts = await Post.find({ role: "user" }).sort({ "createdAt": -1 }).populate('user_id', null, 'User').exec()
        // const businessPosts = await Post.find({ role: "business" }).sort({ "createdAt": -1 }).populate('user_id', null, 'Business').exec()
        // const combinedPosts = [...userPosts, ...businessPosts]
        const combinedPosts = [...abcd, ...abcd2]
        combinedPosts.sort((a, b) => b.createdAt - a.createdAt)
        let finalPosts = []
        for (let i = 0; i < combinedPosts.length; i++) {
            const postDetails = combinedPosts[i];
            // console.log("post => ", ...postDetails)
            let hash = postDetails.hashTags || []
            // console.log("post hash => ", hash)
            let phashes = []
            for (let j = 0; j < hash.length; j++) {
                let hT = hash[j];
                hT = hT.hashTag
                phashes.push(hT)
            }
            postDetails["hashTags"] = phashes
            finalPosts.push({ ...postDetails })
        }
        return {
            message: "posts fetched successfully",
            code: 201,
            data: finalPosts
        }
    } catch (error) {
        throw (error)

    }
}

export const getRelatedPosts = async (req) => {
    try {
        let hashId = req.hashId
        let hashTagQuery = await HashTag.findOne({
            hashTag: hashId
        })
        let requiredHashTag = hashTagQuery?.hashTag || []

        let allRelatedHastagPostsFromUsers = await HashTag.aggregate([
            {
                $match: {
                    "hashTag": requiredHashTag,
                }
            },
            {
                $group: {
                    _id: "$postId"
                }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'postDetails'
                }
            },
            {
                $match: {
                    "postDetails.role": "user"
                }
            },
            {
                $addFields: {
                    "userId": "$postDetails.user_id",
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user_id'
                }
            },
            {
                $unwind: "$postDetails"
            },
            {
                $lookup: {
                    from: 'hashtags',
                    localField: 'postDetails._id',
                    foreignField: 'postId',
                    as: 'hashTags'
                }
            }
        ])

        let allRelatedHastagPostsFromBusinesses = await HashTag.aggregate([
            {
                $match: {
                    "hashTag": requiredHashTag,
                }
            },
            {
                $group: {
                    _id: "$postId"
                }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'postDetails'
                }
            },
            {
                $match: {
                    "postDetails.role": "business"
                }
            },
            {
                $addFields: {
                    "userId": "$postDetails.user_id",
                }
            },
            {
                $lookup: {
                    from: "businesses",
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user_id'
                }
            },
            {
                $unwind: "$postDetails"
            },
            {
                $lookup: {
                    from: 'hashtags',
                    localField: 'postDetails._id',
                    foreignField: 'postId',
                    as: 'hashTags'
                }
            }
        ])

        let final = []
        let finalData = [...allRelatedHastagPostsFromUsers, ...allRelatedHastagPostsFromBusinesses]
        for (let i = 0; i < finalData.length; i++) {
            let hTags = []
            const element = finalData[i];
            let d = element.postDetails
            let u = element.user_id
            let h = element.hashTags
            for (let j = 0; j < h.length; j++) {
                const ht = h[j];
                hTags.push(ht.hashTag)
            }
            d["user_id"] = u
            delete element["postDetails"]
            delete element["hashTags"]
            delete element["userId"]
            final.push({ ...element, ...d, hashTags: [...hTags] })
        }

        return {
            message: "related posts fetched successfully",
            code: 201,
            data: final
        }
    } catch (error) {
        throw (error)
    }
}

export const getPostById = async (req) => {
    try {
        let postDetails;
        let checkUserFromTable = await Post.findOne({ _id: Mongoose.Types.ObjectId(req.id) }).populate('user_id', null, 'User')
        if(checkUserFromTable.user_id == null){
            postDetails = await Post.findOne({ _id: Mongoose.Types.ObjectId(req.id) }).populate('user_id', null, 'Business')
        } else {
            postDetails = checkUserFromTable
        }
        return {
            message: "fetched successfully",
            code: 201,
            data: postDetails
        }
    } catch (error) {
        throw (error)

    }
}

export const sharePost = async (req) => {
    try {
        const postDetails = req.id
        // console.log("Details ===>>>> ", postDetails)
        return {
            message: "fetched successfully",
            code: 201,
            data: postDetails
        }
    } catch (error) {
        throw (error)

    }
}

export const getOwnPosts = async (req) => {
    try {
        // console.log(req)
        // const userPosts = await Post.find({ user_id: Mongoose.Types.ObjectId(req.user_id), role: "user" }).populate('user_id', null, 'User').exec()
        // const businessPosts = await Post.find({ user_id: Mongoose.Types.ObjectId(req.user_id), role: "business" }).populate('user_id', null, 'Business').exec()

        let abcd = await Post.aggregate([
            {
                $match: {
                    $and: [
                        {
                            user_id: Mongoose.Types.ObjectId(req.user_id)
                        }, {
                            role: { $in: ['user'] }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'hashtags',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'hashTags'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_id'
                }
            }
        ])

        let abcd2 = await Post.aggregate([
            {
                $match: {
                    $and: [
                        {
                            role: { $in: ['business'] }
                        }, {
                            user_id: Mongoose.Types.ObjectId(req.user_id)
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'hashtags',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'hashTags'
                }
            },
            {
                $lookup: {
                    from: 'businesses',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_id'
                }
            }
        ])

        const combinedPosts = [...abcd, ...abcd2]
        combinedPosts.sort((a, b) => b.createdAt - a.createdAt)
        let finalPosts = []
        for (let i = 0; i < combinedPosts.length; i++) {
            const postDetails = combinedPosts[i];
            // console.log("post => ", ...postDetails)
            let hash = postDetails.hashTags || []
            // console.log("post hash => ", hash)
            let phashes = []
            for (let j = 0; j < hash.length; j++) {
                let hT = hash[j];
                hT = hT.hashTag
                phashes.push(hT)
            }
            postDetails["hashTags"] = phashes
            finalPosts.push({ ...postDetails })
        }

        return {
            message: "added successfully",
            code: 201,
            data: { userPosts: abcd, businessPosts: abcd2 }
        }
    } catch (error) {
        throw (error)

    }

};

export const getOwnPostsCounts = async (req) => {
    try {
        const userPosts = await Post.count({ user_id: Mongoose.Types.ObjectId(req.user_id) })
        return {
            message: "added successfully",
            code: 201,
            data: { count: userPosts }
        }
    } catch (error) {
        throw (error)

    }

};


////////////////////////////////////



export const addPostLike = async (req) => {
    try {
        let postLike = await Post.findById(req.postId)
        console.log(postLike.likes.some(el => el.likedBy == req.user_id))
        if (postLike.likes.some(el => el.likedBy == req.user_id)) {
            return {
                message: "already liked successfully",
                code: 201,
                data: []
            }
        } else {
            let user_details = await getUserDetails(req.user_id)
            let like = {
                likedBy: req.user_id
            }
            let postLike = await Post.findByIdAndUpdate(req.postId, {
                $push: { likes: like }
            }, { new: true }).exec()

            let newLike = new Like({
                ...req
            })
            const likeDetails = newLike.save()

            const postDetails = await Post.findOne({ _id: Mongoose.Types.ObjectId(req.postId) })
            let tokenFetch = {}
            if (postDetails.role === "user") {
                tokenFetch = await User.findOne({
                    _id: Mongoose.Types.ObjectId(postDetails.user_id)
                })
            } else {
                tokenFetch = await Business.findOne({
                    _id: Mongoose.Types.ObjectId(postDetails.user_id)
                })
            }
            console.log(tokenFetch)

            let postFCMToken = tokenFetch.fcmToken

            notificationService.notify(postFCMToken, 'like', user_details.name)
            return {
                message: "liked successfully",
                code: 201,
                data: postLike
            }
        }

    } catch (error) {
        throw (error)
    }

};

export const removePostLike = async (req) => {
    try {
        let unlike = {
            likedBy: req.user_id
        }
        let postLike = await Post.findByIdAndUpdate(req.postId, {
            $pull: { likes: unlike }
        }, { new: true }).exec()
        await Like.remove({ postId: Mongoose.Types.ObjectId(req.postId), user_id: Mongoose.Types.ObjectId(req.user_id) })
        return {
            message: "unliked successfully",
            code: 201,
            data: postLike
        }
    } catch (error) {
        throw (error)
    }

};

export const getPostLikes = async (req) => {
    try {
        const userLikes = await Like.find({ postId: Mongoose.Types.ObjectId(req.postId), role: "user" }).populate('user_id', null, 'User').exec()
        const businessLikes = await Like.find({ postId: Mongoose.Types.ObjectId(req.postId), role: "business" }).populate('user_id', null, 'Business').exec()
        const allLikes = [...userLikes, ...businessLikes]
        return {
            message: " success",
            code: 201,
            data: allLikes
        }
    } catch (error) {
        throw (error)

    }

};

export const getAllPostLikes = async (req) => {
    try {
        // const userPosts = await Like.find({ role: "user" }).populate('user_id', null, 'User').exec()
        // const businessPosts = await Like.find({ role: "business" }).populate('user_id', null, 'Business').exec()
        // const combinedPosts = [...userPosts, ...businessPosts]
        const likedPosts = await Like.find()
        return {
            message: "likes fetched successfully",
            code: 201,
            data: likedPosts
        }
    } catch (error) {
        throw (error)

    }

};

export const getPostLikeCount = async (req) => {
    try {
        const count = await Like.count({ post_id: Mongoose.Types.ObjectId(req.post_id) })

        return {
            message: "added successfully",
            code: 201,
            data: { count: count }
        }
    } catch (error) {
        throw (error)
    }

};

export const getLikesByUser = async (req) => {
    try {
        const count = await Like.find({ user_id: Mongoose.Types.ObjectId(req.user_id) }).populate({
            path: 'postId',
            model: 'Post',
            populate: {
                path: 'user_id',
                model: 'User'
            }
        }).exec()

        const businessCount = await Like.find({ user_id: Mongoose.Types.ObjectId(req.user_id) }).populate({
            path: 'postId',
            model: 'Post',
            populate: {
                path: 'user_id',
                model: 'Business'
            }
        }).exec()

        let combined = [...count, ...businessCount]
        let finalArray = []
        for (let i = 0; i < combined.length; i++) {
            if (combined[i].postId.user_id != null) {
                finalArray.push(combined[i])
            }
        }
        finalArray.sort((a, b) => b.createdAt - a.createdAt)
        return {
            message: "found successfully",
            code: 201,
            data: finalArray
        }
    } catch (error) {
        throw (error)
    }
}

////////////////////////////////////



export const addPostComment = async (req) => {
    try {
        let user_details = await getUserDetails(req.user_id)
        let comment = {
            text: req.text,
            postedBy: req.user_id
        }
        let commentDetails = await Post.findByIdAndUpdate(req.postId, {
            $push: { comments: comment }
        }, { new: true }).exec()
        let newComment = new Comment({
            ...req
        })
        const newCommentDetails = newComment.save()

        const postDetails = await Post.findOne({ _id: Mongoose.Types.ObjectId(req.postId) })
        let tokenFetch = {}
        if (postDetails.role === "user") {
            tokenFetch = await User.findOne({
                _id: Mongoose.Types.ObjectId(postDetails.user_id)
            })
        } else {
            tokenFetch = await Business.findOne({
                _id: Mongoose.Types.ObjectId(postDetails.user_id)
            })
        }
        console.log(tokenFetch)

        let postFCMToken = tokenFetch.fcmToken

        notificationService.notify(postFCMToken, 'comment', user_details.name)
        return {
            message: "commented successfully",
            code: 201,
            data: commentDetails
        }
    } catch (error) {
        throw (error)
    }

};

export const getPostComment = async (req) => {
    try {
        const userComment = await Comment.find({ postId: Mongoose.Types.ObjectId(req.postId), role: "user" }).populate('user_id', null, 'User').exec()
        const businessComment = await Comment.find({ postId: Mongoose.Types.ObjectId(req.postId), role: "business" }).populate('user_id', null, 'Business').exec()
        const allComments = [...userComment, ...businessComment]
        return {
            message: "comment fetched successfully",
            code: 201,
            data: allComments
        }

    } catch (error) {
        throw (error)
    }

};

export const getPostCommentCount = async (req) => {
    try {
        const count = await Comment.count({ post_id: Mongoose.Types.ObjectId(req.post_id) })

        return {
            message: "added successfully",
            code: 201,
            data: { count: count }
        }
    } catch (error) {
        throw (error)
    }

};

export const removePostComment = async (req) => {
    try {
        await Comment.remove({ _id: Mongoose.Types.ObjectId(req.like_id) })

        return {
            message: "comment removed",
            code: 201,
        }
    } catch (error) {
        throw (error)
    }

};

////////////////////////

export const addPostTags = async (req) => {
    try {


        return {
            message: "liked successfully",
            code: 201,
            data: postLike
        }
    } catch (error) {
        throw (error)
    }

};

export const sharePosts = async (req) => {
    try {
        let share = {
            sharedBy: req.user_id
        }
        let postShare = await Post.findByIdAndUpdate(req.postId, {
            $push: { share: share }
        }, { new: true }).exec()

        let newShare = new Share({
            ...req
        })
        const shareDetails = newShare.save()

        const postDetails = await Post.findOne({ _id: Mongoose.Types.ObjectId(req.postId) })
        let tokenFetch = {}
        if (postDetails.role === "user") {
            tokenFetch = await User.findOne({
                _id: Mongoose.Types.ObjectId(postDetails.user_id)
            })
        } else {
            tokenFetch = await Business.findOne({
                _id: Mongoose.Types.ObjectId(postDetails.user_id)
            })
        }
        console.log(tokenFetch)

        let postFCMToken = tokenFetch.fcmToken

        notificationService.notify(postFCMToken, 'share')
        return {
            message: "shared successfully",
            code: 201,
            data: postShare
        }
    } catch (error) {
        throw (error)
    }

};

export const getPostShares = async (req) => {
    try {
        const userLikes = await Share.find({ postId: Mongoose.Types.ObjectId(req.postId), role: "user" }).populate('user_id', null, 'User').exec()
        const businessLikes = await Share.find({ postId: Mongoose.Types.ObjectId(req.postId), role: "business" }).populate('user_id', null, 'Business').exec()
        const allLikes = [...userLikes, ...businessLikes]
        return {
            message: "shared fetched success",
            code: 201,
            data: allLikes
        }
    } catch (error) {
        throw (error)

    }

};

export const getPostTags = async (req) => {
    try {
        const userLikes = await Tag.find({ postId: Mongoose.Types.ObjectId(req.postId) }).populate('user_id', null, 'User').exec()
        const businessLikes = await Tag.find({ postId: Mongoose.Types.ObjectId(req.postId) }).populate('user_id', null, 'Business').exec()
        const allLikes = [...userLikes, ...businessLikes]
        return {
            message: "tags fetched success",
            code: 201,
            data: allLikes
        }
    } catch (error) {
        throw (error)

    }

};

export const addHidePost = async (req) => {
    try {
        let newPost = new HidePost({
            ...req
        })
        const postDetails = await newPost.save()
        return {
            message: "post removed successfully",
            code: 201,
            data: postDetails
        }
    } catch (error) {
        throw (error)
    }
};

export const getHiddenPosts = async (req) => {
    try {
        const hiddenPosts = await HidePost.find({ user_id: Mongoose.Types.ObjectId(req.user_id) })

        return {
            message: "shared fetched success",
            code: 201,
            data: hiddenPosts
        }
    } catch (error) {
        throw (error)
    }
};

export const reportPosts = async (req) => {
    try {
        let newPost = new Report({
            ...req
        })
        const postDetails = await newPost.save()
        return {
            message: "post reported successfully",
            code: 201,
            data: postDetails
        }
    } catch (error) {
        throw (error)
    }
};

export const deletePosts = async (req) => {
    try {
        const postDetails = await Post.findOneAndDelete({ _id: Mongoose.Types.ObjectId(req.postId) })
        return {
            message: "post deleted successfully",
            code: 201,
            data: postDetails
        }
    } catch (error) {
        throw (error)
    }
};


////////////////////////////////////////////////////////////////////////

export const getPromoPosts = async (req) => {
    try {
        let latNlong = []
        const businessPosts = await Post.find({ role: "business", postType: "promo" }).populate({

            path: 'user_id',
            model: 'Business',
            populate: {
                path: 'gpsAddress',
                model: 'Address'
            }
        }).exec()

        for (let i = 0; i < businessPosts.length; i++) {

            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(businessPosts[i].user_id.gpsAddress.latitude - req.latitude);  // deg2rad below
            var dLon = deg2rad(businessPosts[i].user_id.gpsAddress.longitude - req.longitude);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(req.latitude)) * Math.cos(deg2rad(businessPosts[i].user_id.gpsAddress.latitude)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            var roundOffD = Math.round(d * 100) / 100
            if (businessPosts[i].range == '0-10 kms' && roundOffD <= 10) {
                latNlong.push(businessPosts[i])
            } else if (businessPosts[i].range == '0-40 kms' && roundOffD <= 40) {
                latNlong.push(businessPosts[i])
            } else if (businessPosts[i].range == 'State' && businessPosts[i].promoPlanState == req.state) {
                latNlong.push(businessPosts[i])
                console.log(businessPosts[i], "BUSINESS")
            } else if (businessPosts[i].range == 'National') {
                latNlong.push(businessPosts[i])
            }

        }

        return {
            message: "promo posts fetched successfully",
            code: 201,
            data: latNlong
        }
    } catch (error) {
        throw (error)

    }

};

const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
}

export const getPromoPlans = async (req) => {
    try {

        return {
            message: "promo plans fetched successfully",
            code: 201,
            data: plans
        }
    } catch (error) {
        throw (error)

    }

};

export const getDiscountPlans = async (req) => {
    try {

        return {
            message: "discount plans fetched successfully",
            code: 201,
            data: discountPlan
        }
    } catch (error) {
        throw (error)

    }

};

export const getPayment = async (req) => {
    try {
        let adFee = 0
        let adFeeDetails
        const startTime = new Date(`${req.promoFromDate} ${req.promoFromhrs}`).getTime()
        const endTime = new Date(`${req.promoToDate} ${req.promoToHrs}`).getTime()
        const difference = endTime - startTime
        const differenceInHrs = Math.ceil((difference / 60000) / 60)
        console.log(differenceInHrs)
        if (req.range == '0-10 kms') {
            adFee = 0
            adFeeDetails = {
                hours: differenceInHrs,
                price: adFee
            }
        } else if (req.range == '0-40 kms') {
            adFee = (differenceInHrs * 10)
            adFeeDetails = {
                hours: differenceInHrs,
                price: adFee
            }
        } else if (req.range == 'State') {
            adFee = (differenceInHrs * 30)
            adFeeDetails = {
                hours: differenceInHrs,
                price: adFee
            }
        } else if (req.range == 'National') {
            adFee = (differenceInHrs * 50)
            adFeeDetails = {
                hours: differenceInHrs,
                price: adFee
            }
        }
        return {
            message: "add fee details fetched successfully",
            code: 201,
            data: adFeeDetails
        }
    } catch (error) {
        throw (error)

    }

};


const createOrderCashFreeFunction = async (amount, user_id, phoneNumber) => {
    try {
        var data = {
            order_id: crypto.randomBytes(10).toString("hex"),
            order_currency: "INR",
            order_amount: amount,
            customer_details: {
                customer_id: user_id,
                customer_name: "",
                customer_email: "",
                customer_phone: phoneNumber
            }
        }
        let response = await fetch("https://api.cashfree.com/pg/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': '2441746bae1d0b7cbe40fb92cb471442',
                'x-client-secret': '12622bce637a372a118a3b34a2ddd7eeeb32c118',
                'x-api-version': '2022-01-01',
                'x-request-id': 'etaiiler'
            },
            body: JSON.stringify(data)
        })
        var responseJson = await response.json()
        return responseJson
        // console.log(responseJson)
    } catch (error) { console.log(error) }
}

export const getPaymentOrderId = async (req) => {
    try {
        // var orderId;
        // var options = {
        //     amount: req.amount,
        //     currency: "INR",
        //     receipt: crypto.randomBytes(10).toString("hex")
        // }
        // var my_order = instance.orders.create(options)
        // await my_order.then((res) => {
        //     orderId = res
        // }).catch((error) => {
        //     console.log(error)
        // })
        let orderCreated = await createOrderCashFreeFunction(req.amount, req.userId, req.phoneNumber)

        return {
            message: "orderId generated successfully",
            code: 201,
            data: orderCreated
        }
    } catch (error) {
        throw (error)

    }

};

export const getRazorpayDetails = async (req) => {
    try {
        let newPaymentDetails = new Razorpaydetails({
            ...req
        })
        const paymentDetails = await newPaymentDetails.save()
        let newPost = new Post({
            ...req,
            promoPlanTransactionId: newPaymentDetails._id
        })
        const postDetails = await newPost.save()
        return {
            message: "payment details added successfully",
            code: 201,
            data: paymentDetails
        }
    } catch (error) {
        throw (error)

    }

};