import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  FormControl,
  ModalOverlay,
  Text,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import TandC from "./TandC";
import Uploadprofile from "./Uploadprofile";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/action";
import UpdateAvtar from "./UpdateAvtar";
import ChangePaaword from "./ChangePassword";

function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
   const dispatch=useDispatch()
  const userDataObj = JSON.parse(localStorage.getItem("userdata"));
  const {userid}=userDataObj
  // console.log(avatar)

  const userD=useSelector((state)=>state.user.user)
  console.log(userD)
  const {userName,fullName,avatar}=userD
  // console.log(userDataObj);
  const [user, setUser] = useState(userDataObj);

  useEffect(()=>{
     dispatch(getUser(userid))
  },[])

  return (
    <div className="h-screen flex justify-center items-center flex-col lg:w-[60%]  md:w-[80%] sm:w-[100%]  m-auto ">
      <h1 className="text-[36px] lg:text-left font-[800] sm:text-center">Profile Page :</h1>

      <div className="flex border-b-2 border-[#eee5e5]  flex-col justify-center items-center bottom-2">
        <div>
       
       {/* {
        avatar==true?( */}
          <img
            src={avatar}
            width={400}
            alt="profile"
          />
        {/* ):(
          <img
            src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
            width={400}
            alt="profile"
          />
        )
       } */}
        
          
        
         
        </div>

        <div>
          <Text>{userName}</Text>
          <Text>{fullName}</Text>
        </div>

        <div>
          <div className="rounded-sm my-2 flex gap-3">
          <div>
          <Uploadprofile />
          </div>
           <div>
      <UpdateAvtar/>
  </div>
          </div>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    ref={initialRef}
                    type="text"
                    name="fullName"
                    placeholder="First name"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Avatar</FormLabel>
                  <Input placeholder="Last name" type="text" name="avatar" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div className="flex lg:w-[50%] sm:w-[100%] m-auto my-4 sm:justify-center lg:justify-between md:justify-between gap-2 items-center ">
        <TandC />

        <div>
        <ChangePaaword/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
