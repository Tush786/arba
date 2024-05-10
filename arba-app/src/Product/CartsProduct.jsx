import { Button, Heading, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addtoCart, getcart, removecart } from '../redux/action'
// import { IoMdTrash } from 'react-icons/io'
import Deletecart from './Deletecart'

function CartsProduct(elem) {
  console.log(elem)
    const {product,quantity}=elem
    const [loading,setLoading]=useState(false)
    const [quantit,setQuantit]=useState(quantity)
    const {title,description,price,_id,image}=product
    const [cartProductId, setCartProductId] = useState("")
    console.log(product,quantity)
    const dispatch=useDispatch();

    const carts = useSelector((state) => state.user.carts);
    console.log( carts.orderItems);


  const removeFromCart = (elem) => {
    
    const cart = {
        product: product,
        quantity: quantity-1,
        id:elem._id
      };
      dispatch(addtoCart(cart));
      dispatch(getcart());
  };



  function addToCart() {
    // setQuantit(quantity+1)
    // console.log(quantit)
   
    const cart = {
      product: product,
      quantity: quantity+1,
    };
    dispatch(addtoCart(cart));
    dispatch(getcart());
  }



  return (
    <div>
    {loading ? <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
    /> :
        <div className='flex justify-around items-center'>
            <div className='image_container'>
                <img src={image} alt="" />
            </div>
            <div className='details_container flex justify-around items-center'>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Rs. {price}/-</p>
                <Button style={{ display: quantity > 0 || cartProductId === _id ? "none" : "" }} onClick={addToCart} colorScheme='teal'>ADD TO CART</Button>
                <div style={{ display: quantity > 0 || cartProductId === _id ? "flex" : "none", gap: "1rem", backgroundColor: "teal", padding: " .3rem 0rem", alignItems: "center", justifyContent: "center" }}>
                    <Button onClick={removeFromCart}>-</Button>
                    <Heading>{quantity}</Heading>
                    <Button onClick={addToCart}>+</Button>
                </div>
            </div>
            <div className='' >
             <Deletecart {...elem}/>
            </div>
        </div>}
</div>
  )
}

export default CartsProduct
