import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getproducts } from '../redux/action';

function Product() {
    const products = useSelector((state) => state.user.products);
    const dispatch=useDispatch()
    console.log(products)
    const [isHovered, setIsHovered] = useState(false);

    useEffect(()=>{
        dispatch(getproducts())
    },[])
  return (
    <div  className='w-[80%] m-auto mt-4'>
           <h2 className='text-left text-[36px] font-[600]'>Products</h2>
         <div className='grid grid-cols-4 gap-4 '>
        {
          products.map((el, ind) => {
      
       return (
            <div className="">
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-[100%] bg-[rgb(0,171,197)] py-2 text-[white]"
        >
          {isHovered ? (
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
          ) : (
            <button>Add to Cart</button>
          )}
        </div>
      </div>

     
    </div>
      )
    })
        }
      </div>
    </div>
  )
}

export default Product
