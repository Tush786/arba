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
import { getproducts } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";

function Addproduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const productdata = useSelector((state) => state.user.products);
  console.log(productdata);
  const dispatch = useDispatch();

  function handlechange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  console.log(product);

  function HandleSubmit(e) {
    e.preventDefault();
    dispatch(Addproduct(product)).then(() => {
      dispatch(getproducts());
    });

    setProduct({
      title: "",
      description: "",
      image: "",
      price: "",
    });
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
        ADD PRODUCT
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Categories</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                onChange={handlechange}
                name="title"
                placeholder="Enter Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                onChange={handlechange}
                placeholder="Enter Price"
                name="price"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                onChange={handlechange}
                placeholder="Enter Image"
                name="image"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                onChange={handlechange}
                placeholder="Enter Description"
                name="description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={HandleSubmit} colorScheme="blue" mr={3}>
              Add Product
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Addproduct;
