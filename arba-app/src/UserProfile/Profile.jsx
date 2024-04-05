import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

function Profile() {

  const { isOpen, onOpen, onClose } = useDisclosure()
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


          </div>
        </div>

        <div className='flex w-[50%] m-auto my-4 justify-between  items-center '>
  <div>
  <Button bg='#b1c1cf' px='10' textColor='white' onClick={onOpen}>See T & C</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay className='w-[300px]' />
        <ModalContent>
          <ModalHeader className="uppercase">Term & Condition</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <Text className='text-justify'>By using our e-commerce website, you agree to adhere to the following terms and conditions: All content on this website is subject to change without prior notice. Should you choose to register an account, you are responsible for maintaining its confidentiality and agree to accept all activities occurring under your account. Product details, including pricing and availability, are subject to modification. We reserve the right to refuse or cancel orders due to inaccuracies in product or pricing information. Payments are accepted through specified methods, with submission of an order indicating your agreement to pay the total amount specified. Delivery times may vary, and while we aim to meet estimated delivery dates, we cannot guarantee exact delivery times. Our returns and refunds policy governs the process for returning products and requesting refunds. All website material is either owned by us or licensed to us; reproduction is prohibited without our consent. Your use of this website is at your own risk, and we shall not be liable for any damages. By using our website, you agree to indemnify us from any claims arising from your breach of these terms and conditions. These terms are governed by the laws of [Your Country], and any disputes shall be subject to the exclusive jurisdiction of the courts in </Text>
          </ModalBody>
          <ModalFooter className='felx w-[100%] justify-between'>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancle
            </Button>
            <Button colorScheme='blue' variant='ghost'>Accept</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </div>
  <div>
  <Button bg='#b1c1cf' textColor='white' px='10' onClick={onOpen}>Forget Password</Button>
  </div>
</div>
    </div>
  )
}

export default Profile
