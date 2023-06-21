import * as GetNotificationService from '../services/getNotification.service';

export const getNotifications = async (req, res, next) => {
    try {
        // console.log(req)
        const data = await GetNotificationService.getNotifications(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        next(error);
    }
};
