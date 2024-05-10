import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getproducts } from '../redux/action';
import Productcard from '../Product/Productcard';

import { Button, Text } from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CarouselComp from './Carousel';
function Home() {
  const [arr,setArr]=useState()
  const [activeSlide, setActiveSlide] = useState(0);
  const [showtnc,setShowtnc] =useState(false)
  const products = useSelector((state) => state.user.products);
  // console.log(products)
  const dispatch=useDispatch()

  useEffect(()=>{
      dispatch(getproducts())
  },[])

   const nevigate=useNavigate()
  useEffect(() => {
    const Accepted = localStorage.getItem('Accepted');
    if (!Accepted) {
      setShowtnc(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('Accepted', true);
    setShowtnc(false);
  };

  const handleCancel = () => {
    setShowtnc(false);
  };


  return (
    <div>
      <CarouselComp/>
    <div className='flex flex-col w-[80%] m-auto'>
    {/* <div className='mb-10'>
           <Carousel
          containerProps={{
            style: {
              margin: "auto",
              justifyContent: "space-between",
              userSelect: "none",
            }
          }}
          preventScrollOnSwipe
          swipeTreshold={60}
          activeSlideIndex={activeSlide}
          activeSlideProps={{
            style: {
              background: "rgb(0,171,197)"
            }
          }}
          onRequestChange={setActiveSlide}
          dotsNav={{
            show: true,
            itemBtnProps: {
              style: {
                height: 16,
                width: 16,
                borderRadius: "50%",
                border: 0,
                cursor: "pointer"
              }
            },
            activeItemBtnProps: {
              style: {
                height: 16,
                width: 16,
                borderRadius: "50%",
                border: 0,
                background: "rgb(0,171,197)",
                marginRight: 5,
                marginLeft: 5
              }
            }
          }}
          itemsToShow={2}
          speed={400}
          centerMode
        >
          {Array.from({ length: 5 }).map((item, index) => (
            <div
              style={{
                background: "rgb(0,171,197)",
                width: 900,
                height: 500,
                border: "30px solid white",
                textAlign: "center",
                lineHeight: "240px",
                boxSizing: "border-box"
              }}
              key={index}
            >
            </div>
          ))}
        </Carousel>
        </div> */}



        {showtnc && (
        <>
          <div className=" fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0, 0, 0, 0.5) z-50]"></div>
          <div className="popup ">
            <div className="dialog-content">
              <h2 className='text-left mb-2 text-[20px]'>Terms & Conditions</h2>
              <Text className='text-justify'>By using our e-commerce website, you agree to adhere to the following terms and conditions: All content on this website is subject to change without prior notice. Should you choose to register an account, you are responsible for maintaining its confidentiality and agree to accept all activities occurring under your account. Product details, including pricing and availability, are subject to modification. We reserve the right to refuse or cancel orders due to inaccuracies in product or pricing information. Payments are accepted through specified methods, with submission of an order indicating your agreement to pay the total amount specified. Delivery times may vary, and while we aim to meet estimated delivery dates, we cannot guarantee exact delivery times. Our returns and refunds policy governs the process for returning products and requesting refunds. All website material is either owned by us or licensed to us; reproduction is prohibited without our consent. Your use of this website is at your own risk, and we shall not be liable for any damages. By using our website, you agree to indemnify us from any claims arising from your breach of these terms and conditions. These terms are governed by the laws of [Your Country], and any disputes shall be subject to the exclusive jurisdiction of the courts in </Text>
              <div className='popup-btns my-4'>
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleAccept}>Accept</button>
              </div>
            </div>
          </div>
        </>
      )}

      <h2 className='text-left text-[36px] font-[600]'>Products</h2>
      <div className='grid grid-cols-4 gap-4'>
        {
          products.slice(0, 8).map((el, ind) => {
        return <Productcard key={ind} {...el} />
    })
        }
      </div>

      <div onClick={()=>nevigate('/product')} className='flex justify-end my-4'>
        <Button>All Product <IoIosArrowForward/> <IoIosArrowForward/> </Button>
      </div>
    </div>
    </div>

  )
}

export default Home
