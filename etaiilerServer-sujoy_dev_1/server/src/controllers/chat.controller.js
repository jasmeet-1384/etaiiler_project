import * as ChatService from '../services/chat.service'
import MessagesModel from "../models/messages.model";

export const addConversation = async (req, res, next) => {
    try {
        const data = await ChatService.addConversation(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error);
    }
};

export const getMyConversation = async (req, res, next) => {
    try {
        const data = await ChatService.getMyConversation(req.body);
        
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            unreadCounts: data.unreadCounts,
            message: data.message
        });
    } catch (error) {
        next(error)
    }
}

export const getMyMessages = async (req, res, next) => {
    try {
        const data = await ChatService.getMyMessages(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error)
    }
}

export const getParticularConversationId = async (req, res, next) => {
    try {
        const data = await ChatService.getParticularConversationId(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error)
    }
}