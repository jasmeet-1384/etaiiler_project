import Business from '../models/business.model';
import bcrypt from 'bcrypt'
import Address from '../models/address.model'
var Mongoose = require('mongoose');
import * as jwt from 'jsonwebtoken';

export const businessResgister = async (req) => {
  let businessData = await Business.find({ phoneNumber: req.phoneNumber });
  if (!businessData.length) {
    const passwordHash = await bcrypt.hash(req.password, 10)
    req.password = passwordHash
    let newBusiness = new Business({
      ...req
    })

    const businessDetails = await newBusiness.save()

    let newAddress = new Address({
      user_id: newBusiness._id,
      role: req.role,
      latitude: req.latitude,
      longitude: req.longitude,
      active: req.active,
      addressLine1: req.addressLine1,
      addressLine2: req.addressLine2
    })

    const addressDetails = await newAddress.save()
    const updateGps = await Business.updateOne({
      _id: Mongoose.Types.ObjectId(newBusiness._id)
    }, {
      $set: {
        gpsAddress: newAddress._id,
      }
    })
    return {
      message: "added successfully",
      code: 201,
      data: businessDetails
    }
  }
  else return {
    message: "user already registered",
    code: 400,
    data: {}
  }
};

//get all users
export const getAllBusiness = async (req) => {
  try {
    const business = await Business.find().populate('gpsAddress',null,'Address').exec()
    return {
      message: "business fetched successfully",
      code: 201,
      data: business
    }
  } catch (error) { throw (error) }
}