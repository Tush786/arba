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
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addcategory,
  editcategory,
  getcategory,
  removecategory,
} from "../redux/action";

function CategoriesUpdate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState();
  const [edit, setEdit] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    image: null,
  });

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const userDataObj = JSON.parse(localStorage.getItem("userdata"));
  const { userid } = userDataObj;
  const categorydata = useSelector((state) => state.user.category);
  // console.log(categorydata);
  const dispatch = useDispatch();

  function handlechange(e) {
    if (e.target.name === "image") {
      // For file input
      setCategory({ ...category, image: e.target.files[0] });
    } else {
      // For other inputs
      setCategory({ ...category, [e.target.name]: e.target.value });
    }
  }

  function HandleSubmit(e) {
    e.preventDefault();
  const {name,slug,image}=category

    const formData = new FormData();
    formData.append("Cimage", image);
    formData.append("slug", slug);
    formData.append("name", name);
    formData.append("owner", userid);

    if (edit) {
      dispatch(editcategory(formData, id)).then(() => {
        dispatch(getcategory());
      });
      setEdit(false);
    } else {
      dispatch(addcategory(formData)).then(() => {
        dispatch(getcategory());
      });
    }

    setCategory({
      name: "",
      slug: "",
      image:null,
    });
    onClose()
  }

  useEffect(() => {
    dispatch(getcategory());
  }, []);

  async function DeleteCategory(id) {
    dispatch(removecategory(id)).then(() => {
      dispatch(getcategory());
    });
  }

  function handleEdit(_id, el) {
    const { name, slug, image } = el;
    setCategory({
      name,
      image,
      slug,
    });
    setId(_id);
    setEdit(true);
    onOpen();
  }

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
          ADD CATEGORIES
        </Button>
      </div>

      <div className="border border-gray-200 rounded-md p-4">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-[#3182ce]">
            <tr>
              <th className="border border-[#b1aeae] p-2">Image</th>
              <th className="border border-[#b1aeae] p-2">Name</th>
              <th className="border border-[#b1aeae] p-2">Slug</th>
              <th className="border border-[#b1aeae] p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {categorydata.map((el, ind) => {
              return (
                <tr key={ind}>
                  <td className="border border-[#b1aeae] flex justify-center items-center p-2">
                    <img src={el.image} width={30} />
                  </td>
                  <td className="border border-[#b1aeae] p-2 h-[40px]">{el.name}</td>
                  <td className="border border-[#5a4040] p-2 h-[40px]">{el.slug}</td>
                  <td className="border  border-[#b1aeae] p-2 flex justify-center h-[40px]">
                    <div className="bg-white flex justify-end items-center">
                      <BiEdit
                        onClick={() => {
                          handleEdit(el._id, el);
                        }}
                        className="text-xl mr-1"
                      />{" "}
               
                    <span>|</span>
                   
                      {" "}
                      <MdDelete
                        onClick={() => {
                          DeleteCategory(el._id);
                        }}
                        className="text-xl ml-1"
                      />
                    </div>

                
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
                        
            <FormControl mt={4}>
             <FormLabel>Image</FormLabel>
            <Input
                onChange={handlechange}
                type="file"
                name="image"
                accept="*/*"
                placeholder="Upload Image"
                multiple={false}
              />
            </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>name</FormLabel>
                            <Input
                              onChange={handlechange}
                              placeholder="Enter name"
                              name="name"
                              value={category.name}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>slug</FormLabel>
                            <Input
                              onChange={handlechange}
                              placeholder="Enter Slug"
                              name="slug"
                              value={category.slug}
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

export default CategoriesUpdate;
