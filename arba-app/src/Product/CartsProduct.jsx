import { Button, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart, getcart, removecart } from "../redux/action";
// import { IoMdTrash } from 'react-icons/io'
import Deletecart from "./Deletecart";
import { BiHeart } from "react-icons/bi";

function CartsProduct(elem) {
  console.log(elem);
  const { product, quantity} = elem;
  const [loading, setLoading] = useState(false);
  const [quantit, setQuantit] = useState(quantity);
  const { title, description, price, _id, image } = product;
  const [cartProductId, setCartProductId] = useState("");
  console.log(product, quantity);
  const dispatch = useDispatch();
  console.log(elem._id)

  const carts = useSelector((state) => state.user.carts);
  console.log(carts.orderItems);
  const [cart,setCart]=useState({})

  const removeFromCart = (elem) => {
    const cart = {
      product: product,
      quantity: quantity - 1,
      id: elem._id,
    };
    setCart(cart)
    console.log(cart.quantity)
   
    
  };

  useEffect(()=>{
    if(cart.quantity<=0){
      dispatch(removecart(elem._id)).then(()=>{
       dispatch(getcart())
      })
      console.log(elem._id)
   }
   else{
     dispatch(addtoCart(cart)).then(()=>{
       dispatch(getcart());
     })
   }
  },[cart])

  function handleAddToCart() {
    const cart = {
      product: product,
      quantity: quantity + 1,
    };
    
    dispatch(addtoCart(cart)).then(()=>{
      dispatch(getcart());
    })
    
  }

  return (
    <div>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <div className="">
          <div
            className="w-full m-auto h-[250px] flex justify-center items-center rounded-sm"
            style={{ boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
          >
            <img
              className="h-[100%] w-[100%] rounded-sm"
              src={image}
              alt="title"
            />
          </div>
          <div
            className="relative  bottom-10 right-6 bg-white flex flex-col gap-2 text-[black]  p-2 z-20 w-[75%] m-auto "
            style={{ boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.11)" }}
          >
            <div className="text-left flex flex-col gap-1">
              <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]">
                {title}
              </Text>
              <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]">
                {" "}
                $ {price}
              </Text>
            </div>

            <div className="w-[100%] bg-[rgb(0,171,197)] py-2 text-[white]">
              <div
                style={{
                  display:
                    quantity > 0 || cartProductId === _id ? "flex" : "none",
                  gap: "1rem",
                  backgroundColor: "",
                  padding: " .3rem 0rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button>
                  <span
                    onClick={() => removeFromCart(_id)}
                    style={{
                      paddingRight: "50px",
                      // color: isHovered ? "white" : "black",
                    }}
                  >
                    -
                  </span>
                  {quantity}
                  <span
                    onClick={() => handleAddToCart(elem)}
                    style={{
                      paddingLeft: "50px",
                      // color: isHovered ? "white" : "black",
                    }}
                  >
                    +
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartsProduct;
