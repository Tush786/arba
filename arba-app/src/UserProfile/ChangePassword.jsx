import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import React, { useRef, useState } from "react";
  import { useDispatch } from "react-redux";
  import { Form, useNavigate } from "react-router-dom";
import { changepassword } from "../redux/action";

  
  function ChangePaaword() {
    const Navigate=useNavigate();
    // const userDataObj = JSON.parse(localStorage.getItem("userdata"));
    // const [pass, setPass] = useState({
    //   currentPass:"",
    //   newPass:"",
    //   confnewpassword:""
    // });
  
    // const {userid}=userDataObj
    // const dispatch=useDispatch()
    // const { isOpen, onOpen, onClose } = useDisclosure();
    // const initialRef = useRef(null);
    // const finalRef = useRef(null);
  
    // // function handlechange(e) {
    // //   e.preventDefault();
    // //   setPass({ ...pass, [e.target.name]: e.target.value });
    // // }
  
    // const toast = useToast()
    // function handleSubmit(e) {
    //   e.preventDefault()
    //   const {newPass,currentPass}=pass;
    //   if (currentPass == "") {
    //     return toast({
    //       title: 'Enter Your Current Password',
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //     })
    //   }
    //   if (newPass == "" ) {
    //     return toast({
    //       title: 'Enter Your New Password',
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //     })
    //   }

    //   if (newPass == currentPass) {
    //     return toast({
    //       title: 'Please Check New Password',
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //     })
    //   }

    //   dispatch(changepassword(pass,userDataObj.userid))
    //   onClose();
    // }
  
    return (
      <div>
        <Button 
        // onClick={onOpen}
        onClick={()=>{
          Navigate('/forgetpassword')
        }}
         bg='#b1c1cf' textColor='#fff' >Change Password</Button>
        {/* <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Change Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Old Password</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  name="currentPass"
                  value={pass.currentPass}
                  onChange={handlechange}
                  placeholder="Enter Old Password"
                />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>New Password</FormLabel>
                <Input
                  placeholder="Enter New Password"
                  type="text"
                  value={pass.newPass}
                  onChange={handlechange}
                  name="newPass"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  placeholder="Confirm New Password"
                  type="text"
                  value={pass.confnewpassword}
                  onChange={handlechange}
                  name="confnewpassword"
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
      </div>
    );
  }
  
  export default ChangePaaword;
  