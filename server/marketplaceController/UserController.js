const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors  = require('../middleware/catchAsyncErrors');

const sendEmail =   require('../utils/sendEmail')
const crypto = require("crypto");
const mpSendToken = require('../utils/mpJwtToken');
const User = require('../marketplaceModels/User');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
 
     const {name, email, password ,role} = req.body;
 
     const user =  await User.create({
         name, email, password,role,
         
     })
     mpSendToken(user, 201 , res, false)
 });

 exports.registerAnonymousUser = catchAsyncErrors(async (req, res, next) => {

    const [name, email, password ,role , isAnonymous] = ["annon", "anon@gmail.com", "password", "FullAccess" , true];
     const user =  await User.create({
         name, email, password,role, isAnonymous
         
     })
     mpSendToken(user, 201 , res, true)
 });
 exports.loginAnonymousUser = catchAsyncErrors(async  (req, res, next) => { 

    const [email, password] = [ "anon@gmail.com", "password"];
    req.session.marketplaceSessionId = req.params.marketplaceId;

    if(!email || !password) {
        return next(new ErrorHandler("Please enter email and password"));
    }

    const user =  await User.findOne({email}).select("+password");

    if(!user) { 
        return next(new ErrorHandler("Invalid email and password"));

    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) { 
        return next(new ErrorHandler("Invalid email and password",401));

    }
    mpSendToken(user, 200 , res,true)
})


exports.loginUser = catchAsyncErrors(async  (req, res, next) => { 

    const {email, password} = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please enter email and password"));
    }

    req.session.marketplaceSessionId = req.params.marketplaceId;;
    const user =  await User.findOne({email}).select("+password");

    if(!user) { 
        return next(new ErrorHandler("Invalid email and password"));

    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) { 
        return next(new ErrorHandler("Invalid email and password",401));

    }
    mpSendToken(user, 200 , res, false)
})