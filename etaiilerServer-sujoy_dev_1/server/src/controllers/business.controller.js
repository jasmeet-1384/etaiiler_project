import HttpStatus from 'http-status-codes';
import * as BusinessService from '../services/business.service';

export const businessResgister = async (req,res,next) => {
    try {
      const data = await BusinessService.businessResgister(req.body);
      res.status(data.code).json({
        code: data.code,
        data: data.data,
        message: data.message
      });
    } catch (error) {
      next(error);
    }
  };


  export const getAllBusiness = async (req, res, next) => {
    try {
      const data = await BusinessService.getAllBusiness(req.body);
      res.status(data.code).json({
        code: data.code,
        data: data.data,
        message: data.message
      });
    } catch (error) {
      next(error);
    }
  };