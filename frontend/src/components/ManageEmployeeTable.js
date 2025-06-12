import React, { use, useEffect, useState } from 'react'
import { deleteEmployee, getAllEmployees } from '../services/userService'
import { Button, Popconfirm, Table } from 'antd';
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import toast from 'react-hot-toast';
import CreateEmployModal from './CreateEmployModal';

const ManageEmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [countEmployee, setCountEmployee] = useState(0);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const columns = [
        { title: 'Employee Name', dataIndex: 'name', key: 'name', align: 'center' },
        { title: 'Email', dataIndex: 'email', key: 'email', align: 'center' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span
                    className={`px-3 py-1 rounded text-green-600 ${status == 'active' ? 'bg-green-100' : 'bg-red-100 text-red-600'
                        }`}
                >
                    {status == 'active' ? 'Active' : 'Inactive'}
                </span>
            ),
            align: 'center'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button type="primary">
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this employee?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteEmployee(record.id)}
                    >
                        <Button
                            loading={loading}
                            className='bg-red-600 text-white'>Delete</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const handleGetAllEmployee = async () => {
        setLoading(true);
        try {
            const res = await getAllEmployees();
            console.log(res);
            setEmployees(res.data)
            const count = res.data.length;
            setCountEmployee(count);
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }
    const handleDeleteEmployee = async (id) => {
        try {
            const res = await deleteEmployee(id);
            console.log(res);
            if (res.success) {
                toast.success('Employee deleted successfully');
                handleGetAllEmployee();
            }
            else {
                toast.error('Failed to delete employee');
                
            }

        } catch (error) {
            console.error(error);
            toast.error('Failed to delete employee');
        }
    };

        const handleOpen = () => {
        setOpen(!open);
    }


    useEffect(() => {
        handleGetAllEmployee();
    }, []);
    return (
        <div>
            <h1 className='text-2xl'>Manage Employee</h1>
            <div className='p-5 flex justify-between'>
                <span className='text-xl font-semibold'>{countEmployee} Employee</span>
                <div className='flex gap-3 mr-10'>
                    <Button
                        onClick={() => handleOpen()}
                        icon={<FaPlus size={15} />}
                        className='bg-blue-100 text-blue-800 border-1 border-blue-500'>Create Employee</Button>
                    <Button
                        icon={<CiSearch size={15} />}
                    >Filter</Button>
                </div>
            </div>
            <Table
                dataSource={employees}
                columns={columns}
                className='w-full'
                loading={loading}
            />
            <CreateEmployModal open={open} onCancel={handleOpen} reload={handleGetAllEmployee}/>

        </div>
    )
}

export default ManageEmployeeTable