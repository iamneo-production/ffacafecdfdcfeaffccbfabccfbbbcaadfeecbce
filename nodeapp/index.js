const express=require('express')
const mongoose=require('mongoose')
const port = 8080;
const cors=require('cors')
const tableModel = require('./models/table');
var Cronjob = require('cron').CronJob
// const job = new Cronjob(
//     // '*/4 * * * * *',
//     '0 * * * *',
//     function(){
//         // update()
//         // console.log('hi');
//     },
//     null,
//     true,
// )
// job.start()

// async function update (){
//     console.log('hi');
//     await tableModel.updateMany(
//         {},{
//             $set:{
//                 isAvailable:true
//             }
//         }
//     )
// }

const app=express();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


const dbUrl='mongodb://127.0.0.1:27017'
mongoose.connect(
    dbUrl,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(err)=>{
        if(!err){
            console.log("DB connected Successfully");
        }
        else{
            console.log("DB not connected");
        }
    }     
)

//cors level middleware
app.use(cors())

const userRoutes=require('./routes/users');
const menuRoutes = require('./routes/menu');

//body parser middleware
app.use(express.urlencoded({extended:true}));

//json middleware
app.use(express.json());

//router level middleware function
app.use('/user',userRoutes);
app.use('/restaurant',menuRoutes);


app.get('/error',(req,res)=>{
    res.status(500).send('something went wrong')
})

app.listen(port,()=>{
    console.log(`the server is listening on port ${port}`);
})



