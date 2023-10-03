const cartModel = require("../models/cart");

//adding a cart
const addToCart = async (req, res, next) => {
  try {
    let { menuItems, customerName, description, totalPrice } = req.body;
    await cartModel.insertMany([
      {
        menuItems,
        customerName,
        description,
        totalPrice,
      },
    ]);
    res.json({
      error: false,
      message: "cart has been added successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

//getting cart detail
const cartDetail = async (req, res, next) => {
  const { customerName } = req.params;
  console.log(customerName);
  try {
    let cartMenu = await cartModel.aggregate([
      {
        $lookup: {
          from: "menus",
          localField: "menuItems",
          foreignField: "_id",
          as: "menu",
        },
      },
      //   {
      //     $unwind: "$menu"
      //   },
      {
        $lookup: {
          from: "users",
          localField: "customerName",
          foreignField: "_id",
          as: "customerDetail",
        },
      },
    ]);
    res.json({
      error: false,
      message: "cart details",
      data: cartMenu,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addToCart,
  cartDetail,
};
