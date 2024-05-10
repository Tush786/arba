import React, { useEffect, useRef, useState } from "react";
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
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Addproduct, editproduct, getproducts, removeproduct } from "../redux/action";

function Productupdates() {
  const [id, setId] = useState();
  const [edit, setEdit] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const products = useSelector((state) => state.user.products);
  const dispatch = useDispatch();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  async function DeleteCategory(id) {
    dispatch(removeproduct(id)).then(() => {
      dispatch(getproducts());
    });
  }

  function handlechange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  // console.log(product);

  function HandleSubmit(e) {
    e.preventDefault();
    if (edit) {
      dispatch(editproduct(product, id)).then(() => {
        dispatch(getproducts());
      });
      setEdit(false);
    } else {
      dispatch(Addproduct(product)).then(() => {
        dispatch(getproducts());
      });
    }

    setProduct({
      title: "",
      description: "",
      image: "",
      price: "",
    });
  }

  function handleEdit(_id, el) {
    const { title, description, image, price } = el;
    setProduct({
      price,
      image,
      description,
      title,
    });
    setId(_id);
    setEdit(true);
    onOpen();
  }

  useEffect(() => {
    dispatch(getproducts());
  }, []);
  return (
    <div className="flex flex-col gap-3">
      {/* <Text textAlign='left' >Categories</Text> */}
      <div className="flex justify-start">
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
      </div>
      <div className="border border-gray-200 rounded-md p-4">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-[#3182ce]">
            <tr>
              <th className="border border-[#b1aeae] p-2">Image</th>
              <th className="border border-[#b1aeae] p-2">Name</th>
              <th className="border border-[#b1aeae] p-2">Price</th>
              <th className="border border-[#b1aeae] p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((el, ind) => {
              return (
                <tr key={ind}>
                  <td className="border border-[#b1aeae] p-2">Image</td>
                  <td className="border border-[#b1aeae] p-2">{el.title}</td>
                  <td className="border border-[#b1aeae] p-2">{el.price}</td>
                  <td className="border border-[#b1aeae] p-2 flex justify-center">
                    <BiEdit
                      onClick={() => {
                        handleEdit(el._id, el);
                      }}
                      className="text-xl mr-1"
                    />
                  
                    |{" "}
                    <MdDelete
                      onClick={() => {
                        DeleteCategory(el._id);
                      }}
                      className="text-xl ml-1"
                    />
                  </td>
                </tr>
              );
            })}

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
                              value={product.title}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                              onChange={handlechange}
                              placeholder="Enter Price"
                              name="price"
                              value={product.price}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Image</FormLabel>
                            <Input
                              onChange={handlechange}
                              placeholder="Enter Image"
                              name="image"
                              value={product.image}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input
                              onChange={handlechange}
                              placeholder="Enter Description"
                              name="description"
                              value={product.description}
                            />
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            onClick={HandleSubmit}
                            colorScheme="blue"
                            mr={3}
                          >
                            {edit ? "Update" : "Submit"}
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Productupdates;
