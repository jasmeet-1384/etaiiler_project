import Comment from '../models/comments.model';
import Like from '../models/likes.model';
import Post from '../models/post.model';
import User from '../models/user.model';
import Business from '../models/business.model';
import notificationService from './notification.service';

var Mongoose = require('mongoose');
export const getUserDetails = async (id) => {
    const userData = await User.findById(id);
    const BusinessData = await Business.findById(id);
    console.log("userData", userData)
    console.log("businessData", BusinessData)
    if (userData) {
        console.log("userData>>>>")
        return userData
    }
    if (BusinessData) {
        return BusinessData
    }
}

export const getNotifications = async (req) => {
    try {
        let allcontents = []
        if (req.role == 'user') {
            const userPosts = await Post.find({ user_id: Mongoose.Types.ObjectId(req.user_id), role: "user" }).populate('user_id', null, 'User').lean().exec()

            if (userPosts) {
                for (let i = 0; i < userPosts.length; i++) {
                    if (userPosts[i]?.likes?.length && userPosts[i]?.likes?.length > 0) {
                        for (let index = 0; index < userPosts[i]?.likes?.length; index++) {
                            let element = userPosts[i].likes[index];
                            let dummy = { ...element }
                            dummy.postUser = userPosts[i].user_id
                            dummy.postImage = userPosts[i].image
                            console.log(dummy, "<====== dummy")
                            allcontents.push(dummy)
                            //allcontents.push({ ...element, postUser: userPosts[i].user_id, postImage: userPosts[i].image })
                        }
                    }
                    if (userPosts[i]?.comments?.length && userPosts[i]?.comments?.length > 0) {
                        for (let jndex = 0; jndex < userPosts[i]?.comments?.length; jndex++) {
                            let element = userPosts[i].comments[jndex];
                            let dummy = { ...element }
                            dummy.postUser = userPosts[i].user_id
                            dummy.postImage = userPosts[i].image
                            console.log(dummy, "<====== dummy2")
                            allcontents.push(dummy)

                            //allcontents.push({ ...element, postUser: userPosts[i].user_id, postImage: userPosts[i].image })
                        }
                    }


                    // allcontents.push({...userPosts[i].likes,postUser:userPosts[i].user_id,postImage:userPosts[i].image,postDesc:userPosts[i].description}, {...userPosts[i].comments,postUser:userPosts[i].user_id,postImage:userPosts[i].image,postDesc:userPosts[i].description})
                }
                //console.log(allcontents,"<++++ ALL CONTENTS")
                //console.log(allcontents[0],allcontents[0].createdAt.valueOf(), typeof(allcontents[0].createdAt))
                allcontents.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()).slice(0, 20)
            }
            for (let index = 0; index < allcontents.length; index++) {
                const element = allcontents[index];
                console.log(element)
                if (element.likedBy) {
                    console.log("123")
                    let userDetails = await getUserDetails(element.likedBy)
                    console.log(userDetails)
                    allcontents[index].likedBy = userDetails
                }
                if (element.postedBy) {
                    let userDetails = await getUserDetails(element.postedBy)
                    console.log(userDetails)

                    allcontents[index].postedBy = userDetails
                }
            }
            return {
                message: "added successfully",
                code: 201,
                data: allcontents
            }
        } else {
            const userPosts = await Post.find({ user_id: Mongoose.Types.ObjectId(req.user_id), role: "business" }).populate('user_id', null, 'Business').lean().exec()
            if (userPosts) {
                for (let i = 0; i < userPosts.length; i++) {
                    if (userPosts[i]?.likes?.length && userPosts[i]?.likes?.length > 0) {
                        for (let index = 0; index < userPosts[i]?.likes?.length; index++) {
                            let element = userPosts[i].likes[index];
                            let dummy = { ...element }
                            dummy.postUser = userPosts[i].user_id
                            dummy.postImage = userPosts[i].image
                            console.log(dummy, "<====== dummy")
                            allcontents.push(dummy)
                            //allcontents.push({ ...element, postUser: userPosts[i].user_id, postImage: userPosts[i].image })
                        }
                    }
                    if (userPosts[i]?.comments?.length && userPosts[i]?.comments?.length > 0) {
                        for (let jndex = 0; jndex < userPosts[i]?.comments?.length; jndex++) {
                            let element = userPosts[i].comments[jndex];
                            let dummy = { ...element }
                            dummy.postUser = userPosts[i].user_id
                            dummy.postImage = userPosts[i].image
                            console.log(dummy, "<====== dummy2")
                            allcontents.push(dummy)

                            //allcontents.push({ ...element, postUser: userPosts[i].user_id, postImage: userPosts[i].image })
                        }
                    }


                    // allcontents.push({...userPosts[i].likes,postUser:userPosts[i].user_id,postImage:userPosts[i].image,postDesc:userPosts[i].description}, {...userPosts[i].comments,postUser:userPosts[i].user_id,postImage:userPosts[i].image,postDesc:userPosts[i].description})
                }
                //console.log(allcontents,"<++++ ALL CONTENTS")
                //console.log(allcontents[0],allcontents[0].createdAt.valueOf(), typeof(allcontents[0].createdAt))
                allcontents.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()).slice(0, 20)
            }
            for (let index = 0; index < allcontents.length; index++) {
                const element = allcontents[index];
                console.log(element)
                if (element.likedBy) {
                    console.log("123")
                    let userDetails = await getUserDetails(element.likedBy)
                    console.log(userDetails)
                    allcontents[index].likedBy = userDetails
                }
                if (element.postedBy) {
                    let userDetails = await getUserDetails(element.postedBy)
                    console.log(userDetails)

                    allcontents[index].postedBy = userDetails
                }
            }
            return {
                message: "business notifications",
                code: 201,
                data: allcontents
            }
        }
        // if (businessPosts.length > 0) {
        //     userPosts.push(businessPosts)

        // }
        // userPosts.push(businessPosts)





    } catch (error) {
        throw (error)

    }

};