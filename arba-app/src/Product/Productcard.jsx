import React, { useEffect, useState } from 'react';
import { Button, Text, useToast } from '@chakra-ui/react';
import { addtoCart, getcart, removecart } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { BiHeart } from 'react-icons/bi';

function Productcard(product) {
  const { title, price, image, _id } = product;
  const [isLoading, setIsLoading] = useState(false);
  const carts = useSelector((state) => state.user.carts);
  const dispatch = useDispatch();
  const toast = useToast();
  const [qty, setQty] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (_id && carts && carts.length > 0) {
      const arr = carts.find(el => el.product._id === _id);
      if (arr) {
        setQty(arr.quantity);
        setQuantity(arr.quantity);
      }
    }
  }, [carts, _id]);


  const handleAddToCart = () => {
    setIsLoading(true);
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);

    const cart = {
      product,
      quantity: updatedQuantity,
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
        setIsLoading(false);
      });
  };

  
  const removeFromCart = (_id) => {
    if (_id && carts && carts.length > 0) {
      const arr = carts.find(el => el.product._id === _id);
      if (arr && arr.quantity > 0) {
        const updatedQuantity = arr.quantity - 1;
        setQty(updatedQuantity);
        setQuantity(updatedQuantity);

        if (updatedQuantity <= 0) {
          dispatch(removecart(arr._id))
            .then(() => {
              dispatch(getcart());
              toast({
                title: 'Product Removed Successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            })
            .catch((error) => {
              console.error('Error removing from cart:', error);
              toast({
                title: 'Failed to Remove Product',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            });
        } else {
          const cart = {
            product,
            quantity: updatedQuantity,
          };
          dispatch(addtoCart(cart))
            .then(() => {
              dispatch(getcart());
            })
            .catch((error) => {
              console.error('Error updating cart:', error);
            });
        }
      }
    }
  };

  return (
    <div className="">
      <div className="relative left-[90%] top-8">
        <BiHeart className="cursor-pointer" style={{ fontSize: '24px' }} />
      </div>
      <div
        className="w-full m-auto h-[250px] flex justify-center items-center rounded-sm"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}
      >
        <img className="h-[100%] w-[100%] rounded-sm" src={image} alt="title" />
      </div>
      <div
        className="relative bottom-10 bg-white flex flex-col gap-2 text-[black] p-2 z-20 w-[75%] m-auto"
        style={{ boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.11)' }}
      >
        <div className="text-left flex flex-col gap-1">
          <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]">
            {title.length > 20 ? `${title.substring(0, 10)}...` : title}
          </Text>
          <Text className="text-[20px] font-[600] text-[rgb(111,112,112)]"> ₹ {price}</Text>
        </div>

        <div className="w-[100%] bg-[rgb(0,171,197)] py-2 text-[white]">
          {qty === 0 ? (
            <Button isLoading={isLoading} colorScheme="blue" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          ) : (
            <div className="w-full flex flex-row justify-center items-center gap-4">
              <Button className="px-2" onClick={() => removeFromCart(_id)}>-</Button>
              <span>{quantity}</span>
              <Button onClick={handleAddToCart}>+</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Productcard;
