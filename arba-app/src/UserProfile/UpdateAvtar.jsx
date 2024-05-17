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
import { editAvatar, getUser } from "../redux/action";

function UpdateAvtar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const userDataObj = JSON.parse(localStorage.getItem("userdata"));
  const { userid } = userDataObj;
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setAvatarFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(avatarFile);
    // Check if avatarFile is null
    if (!avatarFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);
    console.log(formData);

    dispatch(editAvatar(formData, userid))
      .then(() => {
        dispatch(getUser(userid));
        onClose();
      })
      .catch((error) => {
        console.error("Error updating avatar:", error);
        // Handle error appropriately (e.g., show error message)
      });
  };

  return (
    <div>
      <Button onClick={onOpen}>Update Avatar</Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
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
                accept="*/*"
                onChange={handleFileChange}
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
  );
}

export default UpdateAvtar;
