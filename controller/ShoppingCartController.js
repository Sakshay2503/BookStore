// const asyncHandler=require("express-async-handler");

// const Cart=require("../model/shoppingCartModel")

// const Bookk=require("../model/bookModel")


// //Adding To Cart

// const addToCart=asyncHandler(async(req,res,next)=>{

//     try {

//     const {bookId,quantity}=req.body;

//     const user=req.userId;

//     const book=await Bookk.findById(bookId);
//     if(!book)
//     {
//         res.status(401).json({message:"Book Not Found..."})
//     }

//     let cart=await Cart.findOne({userId});

//     if(!cart)
//     {
//         cart=new Cart({user,items:[]})
//     }

//     const existingItemIndex=cart.items.findIndex(items=>items.book.toString()===bookId);
//     if (existingItemIndex !== -1) {
//         cart.items[existingItemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ book: bookId, quantity });
//       }

//       await cart.save();
//       res.json(cart);
//     } catch (error) {
//         res.status(500).json({message:"Error Occured..."})
        
//     }

// })



// module.exports={
//     addToCart,

// }