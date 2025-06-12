import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { validateAccessCode } from '../services/userService'
import toast from 'react-hot-toast'

const VerificationForm = ({ role }) => {
    const navigate = useNavigate(false);
    const [loading, setLoading] = useState();
    const [accessCode, setAccessCode] = useState('');

    const handleVerify = async () => {
        setLoading(true);
        const email = localStorage.getItem('email');
        const res = await validateAccessCode(email, accessCode);
        if (res.success) {
            toast.success("Login Successfully")
            localStorage.setItem("verify", true);
            navigate('/dashboard')
        }
        else {
            toast.error("Incorrect Access Code")
            localStorage.setItem("verify", false);
        }
        console.log(res);
        setLoading(false);
    }

    return (
        <>
            <div className="flex flex-col w-[360px] h-[380px] border-2 border-gray-100 rounded p-3">
                <div
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 cursor-pointer">
                    <IoMdArrowBack size={20} />
                    <span>Back</span>
                </div>
                {
                    role === 'owner' ? (
                        <>
                            {/* <h3 className="text-2xl font-semibold text-center">Phone verification</h3>
                            <span className="text-[17px] text-gray-400 text-center mt-4">Please enter your code that send to your phone</span> */}
                            <h3 className="text-2xl font-semibold text-center">Email verification</h3>
                            <span className="text-[17px] text-gray-400 text-center mt-4 ">Please enter your code that send to your email address</span>
                        </>

                    ) : (
                        <>
                            <h3 className="text-2xl font-semibold text-center">Email verification</h3>
                            <span className="text-[17px] text-gray-400 text-center mt-4 ">Please enter your code that send to your email address</span>
                        </>
                    )
                }
                <Input
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter your code" className="mt-10 h-10 border-1 border-gray-400" />
                <Button
                    loading={loading}
                    onClick={() => handleVerify()}
                    className="bg-[#006AFF] h-10 text-white mt-10">Submit</Button>
                <span className="text-[14px] text-gray-400 text-center mt-4">passwordless authenticantion methods</span>
                <span className="text-[12px] text-gray-400 mt-8">Code not receive? <span className="text-[12px] text-[#006AFF] cursor-pointer">Send again</span></span>
            </div>
        </>
    )
}

export default VerificationForm