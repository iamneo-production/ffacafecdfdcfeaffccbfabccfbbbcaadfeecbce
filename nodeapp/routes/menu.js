const express=require('express');
const menuRouter=express.Router();

const menuController = require('../controller/menu');
const tableController = require('../controller/table');
const userController = require('../controller/users');
const paymentController = require('../controller/payment');
const orderController = require('../controller/order');
const ratingController  =require('../controller/ratings');


//Adding a menu item
menuRouter.post('/addMenu',menuController.addMenuItem);
//Editing menu items
menuRouter.put('/editMenu/:_id',menuController.editMenuItem);
//Getting all menu items
menuRouter.get('/getAllMenu',menuController.getAllMenuItems);


//Adding a table
menuRouter.post('/addTable',tableController.addTable);
//Getting table status
menuRouter.get('/table',tableController.getTableStatus);
//editing the table status
menuRouter.put('/table/editStatus',tableController.editTableStatus);

//Getting all users accounts
menuRouter.get('/getAllUsers',userController.getAllUsers);

//Getting all payment details
menuRouter.get('/getAllPayments',paymentController.getAllPayments);
//Getting payment details by customer email
menuRouter.post('/getPaymentByEmail',paymentController.getPaymentByEmail);

//updating the order
menuRouter.put('/editOrder/:_id',orderController.editOrder);
//view all the orders
menuRouter.get('/viewOrder',orderController.viewAllOrders);

//Getting rating details
menuRouter.get('/getRatings',ratingController.getAllRatings);
//Getting rating details
menuRouter.post('/getRatingsByEmail',ratingController.getRatingsByEmail);


module.exports = menuRouter;
