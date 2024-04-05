import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getproducts } from '../redux/action';
import Productcard from '../Product/Productcard';

function Home() {
  const [arr,setArr]=useState()
  const products = useSelector((state) => state.user.products);
  console.log(products)
  const dispatch=useDispatch()

  useEffect(()=>{
      dispatch(getproducts())
  },[])


  return (
    <div>
      <h2>Home</h2>
      <div className='grid grid-cols-4'>
        {
           products.map((el,ind)=>{
              return <Productcard key={ind} {...el}/>
           })
        }
      </div>
    </div>
  )
}

export default Home
