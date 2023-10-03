const mongoose=require('mongoose')
const Schema= mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlenght:3,
        maxlenght:15
    },
    
    email:{
        type:String,
        required:true,
        minlenght:5,
        maxlenght:20
    },
    phoneNo:{
        type:String,
        required:true,
        minlenght:10,
        maxlenght:12
    },
    password:{
        type:String,
        required:true,
        minlenght:8,
        maxlenght:20
    },
    role:{
        type:String,
        required:true,
        minlenght:3,
        maxlenght:10
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order' 
        }
    ],
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    },
    hashedOTP: {
        type: String,
        required: true,
        default:"null"
      },
     verified: {
         type:Boolean,
        
      }
})
module.exports=mongoose.model('user',userSchema)