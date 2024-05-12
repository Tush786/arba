
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
  import { useDispatch, useSelector } from "react-redux";
  import { Form } from "react-router-dom";
  import { editUser, getUser } from "../redux/action";

function UpdateAvtar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const userDataObj = JSON.parse(localStorage.getItem("userdata"));
    const userD=useSelector((state)=>state.user.user)
    const [form, setForm] = useState({
        avatar:userD.avatar,
      });
    
      const {userid}=userDataObj
      const dispatch=useDispatch()
  
      function handlechange(e) {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.files[0] });
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
      <Button onClick={onOpen}>Update Avatar</Button>
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
              <FormLabel>Avatar</FormLabel>
              <Input
                ref={initialRef}
                type="file"
                name="avatar"
                value={form.avatar}
                onChange={handlechange}
                placeholder="update avatar"
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
  )
}

export default UpdateAvtar
