import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { addtoCart, getcart } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

function Productcard(product) {
  console.log(product)
  const {title,price,image,_id}=product
  // const [isHovered, setIsHovered] = useState(false);
  const [q, setQ] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const carts = useSelector((state) => state.user.carts);
  console.log( carts.orderItems);
  const dispatch=useDispatch()

  function addToCart() {
    setQuantity(quantity+1)
    console.log(quantity)
   
    const cart = {
      product: product,
      quantity: quantity+1,
    };
    dispatch(addtoCart(cart)).then(()=>{
      dispatch(getcart());
    })
   
  }

  return (
    <div className="">
      <div className="w-full m-auto h-[250px] flex justify-center items-center">
        <img className="h-[100%] w-[100%]" src={image} alt="title" />
      </div>
      <div
        className="relative bottom-10 bg-white flex flex-col gap-2 text-[black] mx-4 p-2 z-20  "
        style={{ boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)" }}
      >
        <div className="text-left flex flex-col gap-1">
          <Text>Product 1</Text>
          <Text>{title}</Text>
          <Text> $ {price}</Text>
        </div>

        <div
          // onClick={() => setIsHovered(true)}
         
          className="w-[100%] bg-[rgb(0,171,197)] py-2 text-[white]"
        >
          {/* {isHovered ? (
            <div>
              <button>
                <span
                  style={{
                    paddingRight: "50px",
                    color: isHovered ? "white" : "black",
                  }}
                >
                  -
                </span>
                1
                <span
                  style={{
                    paddingLeft: "50px",
                    color: isHovered ? "white" : "black",
                  }}
                >
                  +
                </span>
              </button>
            </div>
          ) : ( */}
           
            <button onClick={addToCart}>Add to Cart</button>
          {/* )} */}
        </div>
      </div>

     
    </div>
  );
}

export default Productcard;

