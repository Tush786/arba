import React, { useEffect, useRef, useState } from 'react'
import {Button,useDisclosure,Modal,ModalBody,ModalContent,ModalOverlay,ModalHeader,FormControl,FormLabel,ModalCloseButton,Input,ModalFooter} from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import Addproduct from './Addproduct'
import { useDispatch, useSelector } from 'react-redux';
import { getproducts, removeproduct } from '../redux/action'

function Productupdates() {
  const [product,setProduct]=useState({
    title:"",
    descrption:"",
    image:"",
    price:""
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const products = useSelector((state) => state.user.products);
  const dispatch=useDispatch()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  async function DeleteCategory(id){
    dispatch(removeproduct(id)).then(() => {
      dispatch(getproducts())
  })
 }

  useEffect(()=>{
    dispatch(getproducts())
  },[])
  return (
    <div className='flex flex-col gap-3'>
    {/* <Text textAlign='left' >Categories</Text> */}
    <div className='flex justify-start'>
    
    <Addproduct/>



</div>
 <div className="border border-gray-200 rounded-md p-4">
<table className="w-full border-collapse border border-gray-200">
  
  <thead className="bg-[#3182ce]" >
    <tr>
      <th className="border border-[#b1aeae] p-2">Image</th>
      <th className="border border-[#b1aeae] p-2">Name</th>
      <th className="border border-[#b1aeae] p-2">Price</th>
      <th className="border border-[#b1aeae] p-2">Action</th>
    </tr>
  </thead>
  <tbody>
  {
    products.map((el,ind)=>{

 

   return  <tr key={ind}>
      <td className="border border-[#b1aeae] p-2">Image</td>
      <td className="border border-[#b1aeae] p-2">{el.title}</td>
      <td className="border border-[#b1aeae] p-2">{el.price}</td>
      <td className="border border-[#b1aeae] p-2 flex justify-center">

        <BiEdit onClick={onOpen} className="text-xl mr-1" /> 

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
              <Input ref={initialRef} name="title" placeholder="Enter Title" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Enter Price"
                name="price"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input placeholder="Enter Image" name="image" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Enter Description" name="description" />
            </FormControl>
          </ModalBody>

    
      

        <ModalFooter>
          <Button colorScheme='blue' mr={3}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

        | <MdDelete onClick={()=>{DeleteCategory(el._id)}} className="text-xl ml-1" />
      </td>
    </tr>
  })
  }
  </tbody>
</table>
</div>
  </div>
  )
}

export default Productupdates
