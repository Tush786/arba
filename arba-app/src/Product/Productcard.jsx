import React, { useState } from 'react';
import { Button, Text, useToast } from '@chakra-ui/react';
import { addtoCart, getcart } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { BiHeart } from 'react-icons/bi';

function Productcard(product ) {
  const { title, price, image, _id } = product;
  const [quantity, setQuantity] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const carts = useSelector((state) => state.user.carts);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = () => {
    setIsloading(true);
    setQuantity(quantity + 1);

    const cart = {
      product,
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
        setIsloading(false); // Reset loading state regardless of success or failure
      });
  };

  return (
    <div className="">
      <div className="relative left-[90%] top-8">
        <BiHeart className="cursor-pointer" style={{ fontSize: '24px' }} />
      </div>
      <div
        className="w-full m-auto h-[250px] flex justify-center items-center rounded-sm"
        style={{ boxShadow: ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}
      >
        <img className="h-[100%] w-[100%] rounded-sm" src={image} alt="title" />
      </div>
      <div
        className="relative  bottom-10 right-6 bg-white flex flex-col gap-2 text-[black]  p-2 z-20 w-[75%] m-auto "
        style={{ boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.11)' }}
      >
        <div className="text-left flex flex-col gap-1">
        <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]">
  {title.length > 20 ? `${title.substring(0, 20)}...` : title}
</Text>
          <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]"> ₹ {price}</Text>
        </div>

        <div className="w-[100%] bg-[rgb(0,171,197)] py-2 text-[white]">
          <Button isLoading={isloading} colorScheme="blue" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
