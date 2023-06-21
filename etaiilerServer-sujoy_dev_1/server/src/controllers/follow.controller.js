import * as FollowService from '../services/follow.service';

export const addFollow = async (req, res, next) => {
    try {
        const data = await FollowService.addFollow(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error);
    }
};

export const removeFollow = async (req, res, next) => {
    try {
        const data = await FollowService.removeFollow(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error);
    }
};

export const getFollow = async (req, res, next) => {
    try {
        const data = await FollowService.getFollow(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error);
    }
};

export const getFollowersList = async (req, res, next) => {
    try {
        const data = await FollowService.getFollowersList(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error);
    }
};

export const getFollowingList = async (req, res, next) => {
    try {
        const data = await FollowService.getFollowingList(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error);
    }
};
