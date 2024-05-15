import React, { useEffect, useState } from 'react';
import { Button, Text, useToast, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart, editcartitems, getcart, getproducts } from '../redux/action';
import { BiHeart } from 'react-icons/bi';
import Loaderhandle from '../Handlesideeffect/Loader';

function Product() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false); // New state for add to cart loading
  const products = useSelector((state) => state.user.products) || [];
  const dispatch = useDispatch();
  const toast = useToast();
  const [iD,setID]=useState("")

  useEffect(() => {
    dispatch(getproducts())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  const handleAddToCart = (el) => {
    setIsAddingToCart(true); // Set loading state to true when adding to cart
    setQuantity(quantity + 1);
    // setID(el._id)
    const cart = {
      product: el,
      quantity: quantity,
    };

    dispatch(addtoCart(cart))
      .then(() => {
        dispatch(getcart());
        toast({
          title: 'Product Added Successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        toast({
          title: 'Failed to Add Product',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsAddingToCart(false); // Reset loading state when action completes
        setQuantity(1); // Reset quantity
      });
  };

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
        {products.map((el, ind) => {
          return (
            <div key={ind}>
              <div className="relative left-[90%] top-8">
                <BiHeart className="cursor-pointer" style={{ fontSize: '24px' }} />
              </div>
              <div
                className="w-full m-auto h-[250px] flex justify-center items-center rounded-sm"
                style={{ boxShadow: ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}
              >
                <img className="h-[100%] w-[100%] rounded-sm" src={el.image} alt="title" />
              </div>
              <div
                className="relative  bottom-10 right-6 bg-white flex flex-col gap-2 text-[black]  p-2 z-20 w-[75%] m-auto "
                style={{ boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.11)' }}
              >
                <div className="text-left flex flex-col gap-1">
                <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]">
  {el.title.length > 20 ? `${el.title.substring(0, 20)}...` : el.title}
</Text>
                  <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]"> ₹ {el.price}</Text>
                </div>
                <div className="w-[100%] bg-[rgb(0,171,197)] py-2 text-[white]">
                  <Button
                    isLoading={isAddingToCart} // Set isLoading to the state for add to cart loading
                    onClick={() => handleAddToCart(el)}
                  >
                    {isAddingToCart ? <Spinner size="sm" color="white" /> : 'Add to Cart'}
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
