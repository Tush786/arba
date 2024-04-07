import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,FormControl, ModalOverlay, Text,FormLabel,Input, useDisclosure } from '@chakra-ui/react'
import React, { useRef } from 'react'
import TandC from './TandC'

function Profile() {

  const { isOpen, onOpen, onClose } = useDisclosure()



const initialRef = useRef(null)
const finalRef = useRef(null)

  return (
    <div className='h-screen mt-8 w-[60%]  m-auto '>
      <h1 className='text-[36px] text-left font-[800]'>Profile Page :</h1>
       
        <div className='flex border-b-2 border-[#eee5e5]  flex-col justify-center items-center bottom-2'>
        
          <div>
            <img  src='https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp' width={400} alt='profile'/>
            
          </div>

          <div>
            <Text>UserName</Text>
            <Text>Email</Text>
          </div>

          <div>
          <div className='rounded-sm py-2 px-6 my-4 bg-[#b1c1cf]'>
  <input type='file' id='fileInput' style={{ display: 'none' }} placeholder='Upload Profile'/>
  <button className='text-[20px] font-[600] text-[white]' onClick={() => document.getElementById("fileInput").click()}>Upload Profile</button>
</div>


<Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button>

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
              <Input ref={initialRef} type='text' name='fullName' placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Avatar</FormLabel>
              <Input placeholder='Last name' type='text' name='avatar'  />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

          </div>
        </div>

        <div className='flex w-[50%] m-auto my-4 justify-between  items-center '>
        <TandC/>

  <div>
  <Button bg='#b1c1cf' textColor='white' px='10' onClick={onOpen}>Forget Password</Button>
  </div>
</div>
    </div>
  )
}

export default Profile
