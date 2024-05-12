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
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { editUser, getUser } from "../redux/action";

function Uploadprofile() {
  const userDataObj = JSON.parse(localStorage.getItem("userdata"));
  const [form, setForm] = useState({
    userName: userDataObj.username,
    fullName: userDataObj.fullname,
  });

  const {userid}=userDataObj
  const dispatch=useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  function handlechange(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(editUser(form,userDataObj.userid)).then(()=>{
      dispatch(getUser(userid))
    })
    onClose();
  }

  return (
    <div>
      <Button onClick={onOpen}>Update Profile</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                ref={initialRef}
                type="text"
                name="userName"
                value={form.userName}
                onChange={handlechange}
                placeholder="First name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Last name"
                type="text"
                value={form.fullName}
                onChange={handlechange}
                name="fullName"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Uploadprofile;
