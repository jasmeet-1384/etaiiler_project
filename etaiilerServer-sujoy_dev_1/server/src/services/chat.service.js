var Mongoose = require('mongoose');
import businessModel from "../models/business.model";
import ConversationModel from "../models/conversation.model";
import MessagesModel from "../models/messages.model";
import io from 'socket.io'

export const addConversation = async (req) => {
    let conversationData = await ConversationModel.find({ users: { $all: [req.from, req.to] } });
    if (!conversationData.length) {

        let newConversation = new ConversationModel({
            users: [req.from, req.to],
            recentMessage: req.text,
            read : false
        })

        const conversationDetails = await newConversation.save()
        let newMessage = new MessagesModel({
            conversation_id: newConversation._id,
            text: req.text,
            to: req.to,
            from: req.from,
            read: [req.from],
        })
        await newMessage.save()
        return {
            message: "added successfully",
            code: 201,
            data: conversationDetails
        }
    }
    else {
        let conversationData = await ConversationModel.updateOne({ users: { $all: [req.from, req.to] } }, {
            $set: {
                recentMessage: req.text,
                read : false
            }
        });
        let conversationDetails = await ConversationModel.findOne({ users: { $all: [req.from, req.to] } });
        let newMessage = new MessagesModel({
            conversation_id: conversationDetails._id,
            text: req.text,
            to: req.to,
            from: req.from,
            read: [req.from],
        })
        await newMessage.save()
        return {
            message: "added successfully",
            code: 201,
            data: conversationData
        }

    }
};


export const getMyConversation = async (req) => {
    let conversationsUser = await ConversationModel.find({ users: { $in: [req.from] } }).populate('users', null, 'User').sort({ _id: -1 }).exec()
    let conversationsBusiness = await ConversationModel.find({ users: { $in: [req.from] } }).populate('users', null, 'Business').sort({ _id: -1 }).exec()

    for (let j = 0; j < conversationsUser.length; j++) {

        for (let i = 0; i < 2; i++) {
            if (conversationsBusiness[j].users[i]?._id) {
                conversationsUser[j].users.push(conversationsBusiness[j].users[i])

            }
        }
    }
    //let conversations = await ConversationModel.find()
    let data = []
    for (let index = 0; index < conversationsUser.length; index++) {
        const element = conversationsUser[index]
        let messages = await MessagesModel.find({ conversation_id: Mongoose.Types.ObjectId(element._id), read: { $nin: [req.from] }})
        console.log(JSON.stringify(messages),"1MESSAGES<<<<<<<<<<<<<")
        data.push({ conversation_id: element._id, unreadLength: messages.length })

    }
    console.log(conversationsUser,"USER<<<<<<<<<<<<<<<<<")
    console.log(data,"<<<<<<<<<<<<<<<<<<<<")
    return {
        message: "fetched conversations successfully",
        code: 201,
        data: conversationsUser,
        unreadCounts: data
    }
}

export const getMyMessages = async (req) => {
    
    let messages = await MessagesModel.find({ conversation_id: Mongoose.Types.ObjectId(req.conversation_id) })
    await MessagesModel.updateMany({ conversation_id: Mongoose.Types.ObjectId(req.conversation_id), read: {"$nin" :[req.userId] } }, { $push: { read: req.userId } })
    return {
        message: "fetched messages successfully",
        code: 201,
        data: messages
    }
}

export const getParticularConversationId = async (req) => {
    let conversationData = await ConversationModel.find({ users: { $all: [req.from, req.to] } });
    return {
        message: "fetched particular conversation successfully",
        code: 201,
        data: conversationData
    }
}