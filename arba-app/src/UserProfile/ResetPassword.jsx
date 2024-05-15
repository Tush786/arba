import { Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false)
  const toast=useToast()

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true)
      setMessage("");
      setError("");
      if (password !== confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false)
          toast({
            title: "Passwords do not match",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
      } else {
          try {
              const token = searchParams.get("token");
              console.log(token)
              const res = await axios.post(`http://localhost:7777/pass/resetPassword`, {token, password })
              setMessage(res.data.message);
          } catch (error) {
              setError(error.response.data.message)
          }finally{
              setIsLoading(false)
          }
         
      }
  }
  return (
    <div className="w-[30%] m-auto">
    <h1 className='text-[24px] font-[600]'>Reset Password</h1>
      <form>
        <FormControl mt={4}>
          <FormLabel>Enter New Password</FormLabel>
          <Input
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            placeholder="Enter New Password"
            name="password"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            onChange={(e)=>{
              setConfirmPassword(e.target.value)
            }}
            placeholder="Enter Price"
            name="confirmPassword"
          />
        </FormControl>
       <Button onClick={handleSubmit} className="w-full mt-5">Reset Password</Button>
      </form>
    </div>
  );
}

export default Resetpassword;
