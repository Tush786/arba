import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { LoginUser, addUser } from '../redux/action';
import { RESET_USER } from '../redux/actiontype';
import { AiTwotoneEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import Loginbanner from '../Images/capture.PNG'

function Signup({onClose, onOpen }) {
    const Navigate=useNavigate();
    const [form,setForm]=useState()

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const [showc, setShowc] = useState(false)
    const handleClick_c = () => setShowc(!showc)
 
    const dispatch = useDispatch()

      const statuscode = useSelector((state) => state.user.statuscode);
  // const statuscode="200"
    const token = useSelector((state) => state.user.token);
    // const token="guririnrnrgnoiuy8"
    console.log(token);
  const toast = useToast()

    const [user, setUser] = useState({
      userName: "",
      fullName: "",
      email: "",
      password: "",
      // avatar:null,
      cpassword:""
    });
  
    // console.log(user)
  
    const HandleChange = (e) => {
      // e.preventDefault();
      // setUser({ ...user, [e.target.name]: e.target.value })
      // if (e.target.name === "image") {
      //   // For file input
      //   setUser({ ...user, image: e.target.files[0] });
      // } else {
      //   // For other inputs
        setUser({ ...user, [e.target.name]: e.target.value });
      // }
    }
  
    const HandleSubmit = async (e) => {
      e.preventDefault()
      const { userName,fullName, email, password,cpassword } = user
      if (userName == "" || userName.length < 3) {
        return toast({
          title: 'Enter Full Name',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
       
      }
  
      if (!email.includes('@') || !email.includes('.com') || email.length<12) {
        return toast({
          title: 'Enter valid email',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
       
      }
    
  
      if (password === "" || password.length <6) {
        return toast({
          title: 'Enter valid password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
  
        
      }

      if (password !== cpassword ) {
        return toast({
          title: 'Wrong Password',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
  
      }
  
      const obj={
        userName,
        fullName,
        email,password
      }
      dispatch(addUser(obj))
  
      setUser({
        userName: "",
        fullName: "",
        email: "",
        password: "",
        cpassword: ""
      })
    }
  
    useEffect(() => {
      if(statuscode=='201'){
        toast({
          title: 'Login successfull',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // onClose()
      }
      else if (statuscode == "200") {
        toast({
          title: 'Signup successfull',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // onClose(); 
        // onOpen();
      }
      else if (statuscode == "409") {
        toast({
          title: 'Email Already Exist',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
      dispatch({ type: RESET_USER, payload: "" })
    }, [statuscode])


  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
    <div className="md:w-1/3 max-w-sm">
      <img
        src={Loginbanner}
        alt="Sample image" />
    </div>
    <div className="md:w-1/3 max-w-sm">
    <div className="flex justify-center py-4 items-center gap-6 ">
           <Text className="text-center text-[24px] font-[600] ">ArBa App</Text>
        </div>
    
      <form onSubmit={HandleSubmit}>
      <InputGroup size='md' mb='4'>
      <Input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            name="userName"
            placeholder="Username"
            onChange={(e) => HandleChange(e)}
      />
      <InputRightElement width='4.5rem'>
        
      </InputRightElement>
    </InputGroup>

    <InputGroup size='md' mb='4'>
      <Input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            name="fullName"
            placeholder="Fullname"
            onChange={(e) => HandleChange(e)}
      />
      <InputRightElement width='4.5rem'>
        
      </InputRightElement>
    </InputGroup>
     
      <InputGroup size='md' mb='4'>
      <Input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => HandleChange(e)}
      />
      <InputRightElement width='4.5rem'>
        
      </InputRightElement>
    </InputGroup>

    {/* <InputGroup size='md' mb='4'>
      <Input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="file"
            name="avatar"
            accept="avatar/*"
            onChange={(e) => HandleChange(e)}
      />
      <InputRightElement width='4.5rem'>
        
      </InputRightElement>
    </InputGroup> */}
    
      <InputGroup size='md' mb='4'>
      <Input
        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
        type={show ? "password" : "text"}
            name="password"
            placeholder="Password"
            onChange={(e) => HandleChange(e)}
      />
      <InputRightElement width='4.5rem'>
      <Button h='1.75rem' size='sm' bg='white' onClick={handleClick}>
          {show ? <AiTwotoneEyeInvisible/> : <AiTwotoneEye/>}
        </Button>
      </InputRightElement>
    </InputGroup>
    
      <InputGroup size='md' display='flex' alignItems='center'>
      <Input
         className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
         type={showc ? "password" : "text"}
            name="cpassword"
            placeholder="Confirm password"
            onChange={(e) => HandleChange(e)}
      />
      <InputRightElement width='4.5rem' >
        <Button h='1.75rem' size='sm' bg='white' onClick={handleClick_c}>
          {showc ? <AiTwotoneEyeInvisible/> : <AiTwotoneEye/>}
        </Button>
      </InputRightElement>
    </InputGroup>
      <input   onChange={(e)=>HandleChange(e)} className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4 bg-[#8898ee] text-white"  type="submit"/>
      </form>
      <div className="mt-4 flex justify-between font-semibold text-sm">
        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
          <input className="mr-1" type="checkbox" />
          <span>Remember Me</span>
        </label>
        <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
      </div>
      {/* <div className="text-center md:text-left">
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login</button>
      </div> */}
      <div  onClick={() => {
            Navigate("/login");
          }} className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        If you have Alredy Registered? <a className="text-red-600 hover:underline hover:underline-offset-4" href="#">Login</a>
      </div>
    </div>
  </section>
  )
}

export default Signup
