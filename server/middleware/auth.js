const OwnerUser = require("../models/User");
const User = require("../marketplaceModels/User")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedOwner = catchAsyncErrors(async (req, res, next) => {
    const {ownerToken} = req.cookies;

    if(!ownerToken) {
        return next(new ErrorHandler("please login first" ,401))
    }
    const decodedData =jwt.verify(ownerToken ,"fdgdfgdfgfdg" )

     req.user =  await OwnerUser.findById(decodedData.id)

     next();
})

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token } = req.cookies;

    if(!token ) {
        return next(new ErrorHandler("please login first" ,401))
    }
    const decodedData =jwt.verify(token ,process.env.PRIVATE_KEY_JWT )

     req.user =  await User.findById(decodedData.id)

     next();
})
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => { 
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}