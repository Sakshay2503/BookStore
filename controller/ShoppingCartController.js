const asyncHandler=require("express-async-handler");

const Cart=require("../model/shoppingCartModel")

const Bookk=require("../model/bookModel")


// Adding To Cart
const addToCart=asyncHandler(async(req, res,next)=> {
    const { userId, bookId, quantity } = req.body;
  
    try {
     
      const book = await Bookk.findById(bookId);
      if (!book) {
         res.status(404).json({ error: 'Book not found' });
      }
  
      let cart = await Cart.findOne({ user: userId });
      
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
        
      const existingItem = cart.items.find(item => item.book.toString() === bookId);
      if (existingItem) {
      
        existingItem.quantity += quantity;
      } else {
        
        cart.items.push({ book: bookId, quantity });
      }
       
      await cart.save();
  
      res.status(201).json(cart);

    } catch (error) {

      res.status(500).json({ error: 'Internal Server Error' });
    }
  })


// Updating The Cart


async function updateCartItem(req, res) {
  const { userId, itemId, quantity } = req.body;

  try {
   
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(item => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


//Removing From The Cart


const removeFromCart = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const bookId = req.params.bookId;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found..." });
        }

        const updatedItems = cart.items.filter(item => item.book.toString() !== bookId);

        if (updatedItems.length === cart.items.length) {
            return res.status(404).json({ message: "Book Not Found in Cart..." });
        }

        cart.items = updatedItems;
        await cart.save();

        res.status(200).json({ message: "Book Removed from Cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error Occurred..." });
    }
});



// const removeFromCart = asyncHandler(async (req, res) => {
//     try {
//       const { bookId } = req.params;
//       const user = req.userId;
  
//       const cart = await Cart.findOne({ user });
//       if (!cart)
//        {
//          res.status(404).json({ message: 'Cart not found' })
//     }
  
//       cart.items = cart.items.filter(item => item.book.toString() !== bookId);
//       await cart.save();
//       res.json(cart);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });




module.exports={
    addToCart,
    updateCartItem,
    removeFromCart,

}