import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { addtoCart, getcart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { BiHeart } from "react-icons/bi";

function Productcard(product) {
  console.log(product)
  const {title,price,image,_id}=product
  // const [isHovered, setIsHovered] = useState(false);
  const [q, setQ] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const carts = useSelector((state) => state.user.carts);
  console.log( carts.orderItems);
  const dispatch=useDispatch()

  function handleAddToCart() {
    setQuantity(quantity+1)
    console.log(quantity)
    // setIsHovered(true)
    const cart = {
      product,
      quantity: quantity,
    };
    dispatch(addtoCart(cart));
    dispatch(getcart());
  }

  return (
    <div  className=''>
    <div className="relative left-[90%] top-8">
      <BiHeart className='cursor-pointer' style={{ fontSize: '24px' }}/>
    </div>
    <div className="w-full m-auto h-[250px] flex justify-center items-center rounded-sm" style={{ boxShadow: ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
      <img className="h-[100%] w-[100%] rounded-sm" src={image} alt="title" />
    </div>
    <div
      className="relative  bottom-10 right-6 bg-white flex flex-col gap-2 text-[black]  p-2 z-20 w-[75%] m-auto "
      style={{ boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.11)" }}
    >
      <div className="text-left flex flex-col gap-1">
        <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]">{title}</Text>
        <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]"> $ {price}</Text>
      </div>

      <div
        // onClick={() => setIsHovered(true)}
        // onClick={() => setIsHovered(false)}
        className="w-[100%] bg-[rgb(0,171,197)] py-2 text-[white]"
      >
      
          {/* <div style={{ display: quantity > 1 || cartProductId === el._id ? "flex" : "none", gap: "1rem", backgroundColor: "teal", padding: " .3rem 0rem", alignItems: "center", justifyContent: "center" }}>
            <button>
              <span
                 onClick={() => removeFromCart(el._id)}
                style={{
                  paddingRight: "50px",
                  color: isHovered ? "white" : "black",
                }}
              >
                -
              </span>
            1
              <span
                onClick={() => handleAddToCart(el)}
                style={{
                  paddingLeft: "50px",
                  color: isHovered ? "white" : "black",
                }}
              >
                +
              </span>
            </button>
          </div> */}
     
          <Button
          // style={{ display: quantity > 1 || cartProductId === el._id ? "none" : "" }}
          onClick={() => handleAddToCart()}>
            Add to Cart
          </Button>
     
      </div>
    </div>
  </div>
  );
}

export default Productcard;

