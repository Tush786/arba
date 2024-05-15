import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from 'axios';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit");
        try {
            setIsLoading(true);
            setMessage("");
            setError("");

            const res = await axios.post(`http://localhost:7777/pass/forgotPassword`, { email });

            setMessage(res.data.message);
            console.log(res.data.message);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[30%] m-auto">
            <h1 className='text-[24px] font-[600]'>Forget Password</h1>
            <form onSubmit={handleSubmit}>
                <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        name="email"
                    />
                </FormControl>
                <Button type="submit" className="w-full mt-5" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Forget Password"}
                </Button>
            </form>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgetPassword;
