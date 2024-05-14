import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from 'axios';
function Forgetpassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit")
        try {
            setIsLoading(true)
            setMessage("");
            setError("");
            const res = await axios.post("http://localhost:7777/pass/forgotPassword",{email})
            console.log(res);
            setMessage(res.data.message);
            console.log(res.data.message);
        } catch (error) {
            setError(error.response.data.message)
            console.log(error);
            console.log(error.response.data.message);
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div className="w-[30%] m-auto">
    <form >
      <FormControl mt={4}>
        <FormLabel>Enter New Password</FormLabel>
        <Input
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          placeholder="Enter Email"
          name="email"
        />
      </FormControl>
     <Button  onClick={handleSubmit} className="w-full mt-5" disabled={isLoading}>Forget Password</Button>
    </form>
  </div>
  )
}

export default Forgetpassword
