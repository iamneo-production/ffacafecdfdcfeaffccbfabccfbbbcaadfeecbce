const mongoose=require('mongoose')
const Schema=mongoose.Schema

const paymentSchema=new Schema(
    {
        paymentMode:{
            type:String,
            required:true
        },
        orderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        },
        customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        email:{
            type:String,
            required:true
        },
        customerName:{
            type:String,
            required:true
        },
        paymentDesc:{
            type:String,
            required:true
        },
        phNo:{
            type:String,
            required:true
        },
        totalPrice:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        
    },
    { timestamps: true }

)

module.exports=mongoose.model('payment',paymentSchema);