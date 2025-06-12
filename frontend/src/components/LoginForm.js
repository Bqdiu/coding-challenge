import { Button, Input } from "antd";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { createAccessCode } from "../services/userService";
import { checkEmailFormat } from "../helpers/formatEmail";
import toast from "react-hot-toast";

const LoginForm = ({ role }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendCode = async () => {
        setLoading(true);
        const checkEmail = checkEmailFormat(email);
        if (email != '' && checkEmail) {
            const res = await createAccessCode(email, role);
            console.log(res);
            localStorage.setItem("email",email);
            localStorage.setItem("role",role);
            toast.success('Code has been sent. Please check email')
            navigate('verification');
        }
        else {
            toast.error('Email invalid')
        }
        setLoading(false);
    }
    return (
        <>
            <div className="flex flex-col w-[360px] h-[380px] border-2 border-gray-100 rounded p-3">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <IoMdArrowBack size={20} />
                    <span>Back</span>
                </div>
                <h3 className="text-2xl font-semibold text-center">Sign In</h3>
                {
                    role === 'owner' ? (
                        // <span className="text-[17px] text-gray-400 text-center mt-4">Please enter your phone number to sign in</span> 
                        <span className="text-[17px] text-gray-400 text-center mt-4">Please enter your email to sign in</span> // sms api not free so i will use stmp for this feature

                    ) : (
                        <span className="text-[17px] text-gray-400 text-center mt-4">Please enter your email to sign in</span>
                    )
                }
                <Input
                    placeholder="Your Email"
                    className="mt-10 h-10 border-1 border-gray-400"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Button
                    className="bg-[#006AFF] h-10 text-white mt-10"
                    onClick={() => handleSendCode()}
                    loading={loading}
                >Next</Button>
                <span className="text-[14px] text-gray-400 text-center mt-4">passwordless authenticantion methods</span>
                <span className="text-[12px] text-gray-400 mt-8">Don't having account? <span className="text-[12px] text-[#006AFF] cursor-pointer">Sign up</span></span>
            </div>
        </>
    )
}

export default LoginForm