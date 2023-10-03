const express=require('express');
const UserRouter=express.Router();

const userController=require('../controller/users');
const cartController = require('../controller/cart');
const orderController = require('../controller/order');
const paymentController = require('../controller/payment');
const ratingController = require('../controller/ratings');
const tableController = require('../controller/table');

//Registration
UserRouter.post('/register',userController.register);

//LogIn
UserRouter.post('/login',userController.login);
//Otp verification for login
UserRouter.post('/verifyotp',userController.candidateVerification);

//send otp for forgot password
UserRouter.post('/forgotPassOTP',userController.forgotPasswordSendOTP);
//verify email for forgot password
UserRouter.post('/verifyEmail',userController.verifyEmail);
//reset password
UserRouter.put('/resetPassword',userController.resetPassword);


//getting user by the userID
UserRouter.get('/getUser/:_id',userController.getUserById);

//Updating Use Profile
UserRouter.put('/editUser/:_id',userController.editUserProfile);

//Adding menu items to a cart
UserRouter.post('/cart',cartController.addToCart);
UserRouter.get('/cartDetail/:customerName',cartController.cartDetail);

//Creating the order
UserRouter.post('/order',orderController.createOrder);
//editing an order
UserRouter.put('/order/modify/:_id',orderController.editOrder);
//review the order
UserRouter.get('/order/review/:customerId',orderController.reviewOrder);

//making a payment
UserRouter.post('/payment',paymentController.makePayment);

//feedback
UserRouter.post('/ratings',ratingController.addRatings)

//booking a table
UserRouter.post('/bookTable',tableController.bookTable);



module.exports=UserRouter