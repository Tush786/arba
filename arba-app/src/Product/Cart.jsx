import React, { useEffect, useState } from "react";

import { Heading, Spinner, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getcart } from "../redux/action";
import CartsProduct from "./CartsProduct";

const Cart = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const carts = useSelector((state) => state.user.carts);
  console.log( carts.orderItems);

  useEffect(() => {
    dispatch(getcart());
  },[]);

  return (
    <div>
      <div className="product_container">
        <div className="product_heading">
          <Heading>Carts Products</Heading>
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
              {carts.orderItems && carts.orderItems.length > 0 ? (
                <div className="products">
                  {carts.orderItems.map((el, ind) => (
                
                    <CartsProduct key={ind} {...el} />
                  ))}
                </div>
              ) : (
                <div>
                  <Heading>
                    You don't have products in cart. Go to Product page and add
                    items.
                  </Heading>
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
