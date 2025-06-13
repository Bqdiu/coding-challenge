import { Dropdown, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell } from "react-icons/fa";
import toast from 'react-hot-toast';
import ManageEmployeeTable from '../components/ManageEmployeeTable';

const DashBoard = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const verify = localStorage.getItem('verify');
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const itemsOwner = [
        {
            label: 'Manage Employee',
            key: 'employee',
        },
        {
            label: 'Manage Task',
            key: 'task',
        },
        {
            label: 'Message',
            key: 'message',
        },
    ];

    const itemsEmployee = [
        {
            label: 'Manage Task',
            key: 'task',
        },
        {
            label: 'Message',
            key: 'message',
        },
    ];



    const userSetting = [
        {
            key: '1',
            label: (
                <a>
                    {email}
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a onClick={() => handleLogout()}>
                    Logout
                </a>
            ),
        }
    ];

    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogout = () => {
        localStorage.clear();
        toast.success("Logout successfully")
        navigate('/')
    }



    useEffect(() => {
        if (verify == "false") {
            navigate('/');
        }
    }, [verify]);


    return (
        <div>
            <header className='h-[100px] w-full flex justify-between'>
                <div className='text-4xl flex items-center ml-5 font-bold'>
                    Dash Board
                </div>
                <div className='flex gap-5 items-center mr-10'>
                    <FaBell size={30} className='cursor-pointer' />
                    <Dropdown
                        menu={{ items: userSetting }}
                    >
                        <FaUserCircle size={30} className='cursor-pointer' />

                    </Dropdown>
                </div>
            </header>
            <div className="flex flex-1">
                <div className="w-[280px] bg-gray-100 border-r">
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="vertical"
                        items={role == 'owner' ? itemsOwner : itemsEmployee}
                        className="h-full"
                    />
                </div>
                <div className="flex-1 p-5 overflow-y-auto">
                    {current === "employee" && <ManageEmployeeTable />}
                </div>
            </div>

        </div>
    )
}

export default DashBoard