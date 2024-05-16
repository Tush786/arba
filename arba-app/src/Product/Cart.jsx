import React, { useEffect, useState } from "react";

import { Heading, Spinner, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getcart } from "../redux/action";
import CartsProduct from "./CartsProduct";
import Cartempty from "../Handlesideeffect/Cartempty";
import Loaderhandle from "../Handlesideeffect/Loader";

const Cart = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  const carts = useSelector((state) => state.user.carts);
  console.log( carts.orderItems);

  useEffect(() => {
    dispatch(getcart())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);
 
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loaderhandle/>
      </div>
    );
  }

  return (
    <div>
      <div className="product_container w-[80%] m-auto">
        <div className="product_heading mb-4">
          <Heading className="text-left">Carts Products</Heading>
        </div>
        <div className="Product_container">
          {loading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <div className="Product_container">
              {carts && carts.length > 0 ? (
                <div className="products grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 ">
                  {carts.map((el, ind) => (
                
                    <CartsProduct key={ind} {...el} />
                  ))}
                </div>
              ) : (
                <div>
                 <Cartempty/>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
