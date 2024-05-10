import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button} from '@chakra-ui/react'
import {
  addtoCart,
  editcartitems,
  getcart,
  getproducts,
} from "../redux/action";

function Product() {
  const [q, setQ] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [el, setEl] = useState({});
  // const [cartProductId, setCartProductId] = useState("");

  const products = useSelector((state) => state.user.products) || [];
  const carts = useSelector((state) => state.user.carts) || [];

  const dispatch = useDispatch();
  console.log(carts);
  // const [isHovered, setIsHovered] = useState(false);

  // function handleAddToCart(el) {
  //   setEl(el);
   
  //   dispatch(addtoCart({ productId: el._id, quantity }))
  //   dispatch(getcart());
   
  // }

  // const removeFromCart = (id) => {
  //   if (quantity - 2 > 0)
  //     dispatch(addtoCart({ productId: el._id, quantity: quantity - 2 }));
  //   else {
  //     dispatch(editcartitems(id));
  //   }
  // };


  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

  function handleAddToCart(el) {
    setQuantity(quantity+1)
    console.log(quantity)
    // setIsHovered(true)
    const cart = {
      product: el,
      quantity: quantity,
    };
    dispatch(addtoCart(cart));
    dispatch(getcart());
  }




  return (
    <div className="w-[80%] m-auto mt-4">
      <h2 className="text-left text-[36px] font-[600]">Products</h2>
      <div className="grid grid-cols-4 gap-4 ">
        {products.map((el, ind) => {
          return (
            <div key={ind} className="">
              <div className="w-full m-auto h-[250px] flex justify-center items-center">
                <img className="h-[100%] w-[100%]" src={el.image} alt="title" />
              </div>
              <div
                className="relative  bottom-10 bg-white flex flex-col gap-2 text-[black]  p-2 z-20 w-[80%] m-auto "
                style={{ boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)" }}
              >
                <div className="text-left flex flex-col gap-1">
                  <Text>Product 1</Text>
                  <Text>{el.title}</Text>
                  <Text> $ {el.price}</Text>
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
                    onClick={() => handleAddToCart(el)}>
                      Add to Cart
                    </Button>
               
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
