const mongoose=require('mongoose')
const Schema=mongoose.Schema

const tableSchema=new Schema(
    {
        tableNo:[{
            type:Number,
            required:true
        }],
        alloted:{
            type:Boolean,
            required:true
        },
        served:{
            type:Boolean,
            required:true
        },
        booked:{
            type:Boolean,
            required:true
        },
        bookingDate:{
            type:String,
        },
        bookingTime:{
            type:String,
        },
        isAvailable:{
            type:Boolean,
            required:true,
            default:true
        }
    }
)

module.exports=mongoose.model('table',tableSchema);