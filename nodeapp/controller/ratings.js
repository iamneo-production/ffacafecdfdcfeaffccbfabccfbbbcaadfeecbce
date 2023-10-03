const ratingModel = require('../models/rating');

//adding feedback and rating from customer
const addRatings= async (req,res,next)=>{
    try{
        let{customerId,email,rating,feedback}=req.body
        await ratingModel.insertMany([{
            customerId,
            email,
            rating,
            feedback
        }])
        res.json({
            error:false,
            message:"rating has been received successfully",
            data:null
        })
    }catch(err){
        next(err)
    }
}

//Getting all the rating details
const getAllRatings = async (req, res, next) => {
    let { email } = req.body;
    try {
      const user = await ratingModel.find().lean();
      if (user) {
        res.json({
          error: false,
          message: "User Ratings found successfully",
          data: user,
        });
      } else {
        res.json({
          error: false,
          message: "User not found ",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  //Getting all the by email rating details
const getRatingsByEmail = async (req, res, next) => {
  let { email } = req.body;
  try {
    const user = await ratingModel.find({email}).lean();
    if (user) {
      res.json({
        error: false,
        message: "User Ratings found successfully",
        data: user,
      });
    } else {
      res.json({
        error: false,
        message: "User not found ",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
    addRatings,
    getAllRatings,
    getRatingsByEmail
}