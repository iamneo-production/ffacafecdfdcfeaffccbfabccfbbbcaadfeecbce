const orderModel = require("../models/order");

//creating an order from the cart
const createOrder = async (req, res, next) => {
  try {
    let { menuItems, customerId, description, totalPrice,tableNo,status } = req.body;
    await orderModel.insertMany([
      {
        menuItems,
        customerId,
        description,
        totalPrice,
        tableNo,
        status
      },
    ]);
    res.json({
      error: false,
      message: "order has been placed successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

//Editing an order
const editOrder= async (req,res,next)=>{
    try{
        let {menuItems, customerId, description, totalPrice,tableNo,status}= req.body;
        let {_id} = req.params;

        const order= await orderModel.findOne({_id}).lean();
        if(order){
        await orderModel.updateOne(
            {_id},{
                $set:{
                    menuItems, 
                    customerId, 
                    description, 
                    totalPrice,
                    tableNo,
                    status
                }
            }
        )
        }
        else{
            res.json({
                error:false,
                message:"order not found ",
            })
        }
        res.json(
            {
                error:false,
                message:"order has been modified successfully",
                data:null
            }
        )
    }catch(err){
        next(err)
    }
}
//Review order for customer
const reviewOrder= async (req,res,next)=>{
    try{
        let {customerId} = req.params;

        const order= await orderModel.findOne({customerId}).lean();
        if(order){
            res.json(
                {
                    error:false,
                    message:"order found successfully",
                    data:order
                }
            )
        }
        else{
            res.json({
                error:false,
                message:"order not found ",
            })
        }
        
    }catch(err){
        next(err)
    }
}

//view all the orders for the admin
const viewAllOrders= async (req,res,next)=>{
    try{
        const orders= await orderModel.find().lean();
        if(orders){
            res.json(
                {
                    error:false,
                    message:"orders found successfully",
                    data:orders
                }
            )
        }
        else{
            res.json({
                error:false,
                message:"order not found ",
            })
        }
        
    }catch(err){
        next(err)
    }
}




module.exports = {
    createOrder,
    editOrder,
    reviewOrder,
    viewAllOrders
}
