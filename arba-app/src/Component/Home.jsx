import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getproducts } from '../redux/action';
import Productcard from '../Product/Productcard';
import { Button, Text, Spinner } from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CarouselComp from './Carousel';
import Loaderhandle from '../Handlesideeffect/Loader';

function Home() {
  const [arr, setArr] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const [showtnc, setShowtnc] = useState(false);
  const products = useSelector((state) => state.user.products);
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  useEffect(() => {
    dispatch(getproducts());
  }, []);

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

  // Loader component
  const Loader = () => (
    <div className="flex items-center justify-center mt-8">
      <Loaderhandle/>
    </div>
  );

  return (
    <div>
      <CarouselComp />
      <div className="flex flex-col w-[80%] m-auto">
        {showtnc && (
          <>
            <div className=" fixed top-0 left-0 w-[100%] h-[100%] bg-[rgba(0, 0, 0, 0.5) z-50]"></div>
            <div className="popup ">
              <div className="dialog-content">
                <h2 className="text-left mb-2 text-[20px]">Terms & Conditions</h2>
                <Text className="text-justify">
                  {/* Your terms and conditions content */}
                </Text>
                <div className="popup-btns my-4">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleAccept}>Accept</button>
                </div>
              </div>
            </div>
          </>
        )}

        <h2 className="text-left text-[36px] font-[600]">Products</h2>
        {/* Conditional rendering for loader */}
        {products.length === 0 ? (
          <Loader/>
        ) : (
          <div className="grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 ">
            {products.slice(0, 8).map((el, ind) => (
              <Productcard key={ind} {...el} />
            ))}
          </div>
        )}

        <div onClick={() => nevigate('/product')} className="flex justify-end my-4">
          <Button>
            All Product <IoIosArrowForward /> <IoIosArrowForward />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
