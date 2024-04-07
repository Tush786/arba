import React, { useRef, useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  FormControl,
  FormLabel,
  ModalCloseButton,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { addcategory, getcategory } from "../redux/action";

function AddCategori() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch=useDispatch()
  const [category,setCategory]=useState({
    name:"",
    slug:"",
    image:""
  })

  const categorydata=useSelector(state=>state.user.category)
  console.log(categorydata)

  function handlechange(e){
    setCategory({...category,[e.target.name]:e.target.value})
  }

  console.log(category)

  function HandleSubmit(e){
  
    e.preventDefault();
    dispatch(addcategory(category)).then(() => {
      dispatch(getcategory());
    });
  
    setCategory({
      name:"",
      slug:"",
      image:""
    })
  }


  return (
    <div>
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="blue.100"
        className="bg-[#00abc5]"
        onClick={onOpen}
      >
        ADD CATEGORIES
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input onChange={handlechange} ref={initialRef} placeholder="Enter Image url" name="image" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>name</FormLabel>
              <Input onChange={handlechange} placeholder="Enter name" name="name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>slug</FormLabel>
              <Input onChange={handlechange} placeholder="Enter Slug" name="slug" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={HandleSubmit} colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AddCategori;
