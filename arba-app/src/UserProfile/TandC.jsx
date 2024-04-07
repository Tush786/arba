import React from 'react'
import {useDisclosure,Button,ModalBody,Modal,ModalHeader,ModalFooter,ModalOverlay,ModalCloseButton,ModalContent,Text} from '@chakra-ui/react'
function TandC() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
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
  )
}

export default TandC
