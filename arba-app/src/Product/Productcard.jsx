import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

function Productcard({ title, description, image, price }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="">
      <div className="w-full m-auto h-[250px] flex justify-center items-center">
        <img className="h-[100%] w-[100%]" src={image} alt="title" />
      </div>
      <div
        className="relative bottom-10 bg-white flex flex-col gap-2 text-[black] mx-4 p-2 z-20  "
        style={{ boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)" }}
      >
        <div className="text-left flex flex-col gap-1">
          <Text>Product 1</Text>
          <Text>{title}</Text>
          <Text> $ {price}</Text>
        </div>

        <div
          onClick={() => setIsHovered(true)}
         
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
  );
}

export default Productcard;

