import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='flex justify-center items-center min-h-screen w-full gap-10'>
                <div
                    className='h-20 w-48 flex justify-center items-center bg-orange-500 font-bold rounded cursor-pointer'
                    onClick={() => navigate('/owner/login')}
                >
                    Owner
                </div>
                <div
                    className='h-20 w-48 flex justify-center items-center bg-green-500 font-bold rounded cursor-pointer'
                    onClick={() => navigate('/employee/login')}
                >
                    Employee
                </div>
            </div>
        </div>
    )
}

export default Home