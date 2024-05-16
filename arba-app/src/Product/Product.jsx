import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from '../redux/action';
import Loaderhandle from '../Handlesideeffect/Loader';
import Productcard from "./Productcard";

function Product() {
  const products = useSelector((state) => state.user.products) || [];
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loaderhandle />
      </div>
    );
  }

  return (
    <div className="w-[80%]  m-auto mt-4">
      <h2 className="text-left text-[36px] font-[600]">Products</h2>
      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 sm:gap-10 gap-10">
        {products?.map((product, index) => (
          <Productcard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Product;
