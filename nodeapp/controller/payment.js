const paymentModel = require('../models/payment');

//making a payment against an order
const makePayment = async (req, res, next) => {
    try {
      let { paymentMode,orderId,customerId,email,customerName,paymentDesc,phNo,totalPrice,status } = req.body;
      await paymentModel.insertMany([
        {
            paymentMode,
            orderId,
            customerId,
            email,
            phNo,
            customerName,
            paymentDesc,
            totalPrice,
            status
        },
      ]);
      res.json({
        error: false,
        message: "payment has been made successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  };

  //Getting all payment details

  const getAllPayments= async (req,res,next)=>{
    try{
       const payments= await paymentModel.find().lean();
       res.json({
           error:false,
           message:"all payment detail",
           data:payments
       })
    }catch(err){
        next(err)
    }
}

//Getting all payment details

const getPaymentByEmail= async (req,res,next)=>{
  let {email} = req.body;
  try{
     const payments= await paymentModel.find({email}).lean();
     res.json({
         error:false,
         message:"all payment detail",
         data:payments
     })
  }catch(err){
      next(err)
  }
}

  module.exports = {
    makePayment,
    getAllPayments,
    getPaymentByEmail
  }