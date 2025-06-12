import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import toast from "react-hot-toast";
import { checkEmailFormat } from '../helpers/formatEmail';
import { createEmployee } from '../services/userService';

const CreateEmployModal = ({ open, onCancel, reload }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateEmployee = async () => {
        setLoading(true);
        if (name == '' || email == '' || address == '' || role == '') {
            toast.error("Please enter full information");
        }
        else {
            if (!checkEmailFormat(email)) {
                toast.error("Email invalid");
                setLoading(false);
                return;
            }
            const payload = {
                name: name,
                email: email,
                address: address,
                role: role
            }
            const res = await createEmployee(payload)
            if (res.success) {
                toast.success("Create new employee successfully");
            }
            else {
                const errMessage = res?.message;
                toast.error(errMessage);
            }
            console.log(res);
        }
        setLoading(false);
        reload();
        clearState();
        onCancel();
    }

    const clearState = () => {
        setName('');
        setEmail('');
        setAddress('');
        setRole('');
    }
    return (
        <Modal
            title="Create Employee"
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    key="submit" type="primary"
                    loading={loading}
                    onClick={() => handleCreateEmployee()}
                >
                    Create
                </Button>,
            ]}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                    <Input
                        id="employeeName"
                        placeholder="Employee Name"
                        className="w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <Input
                        id="emailAddress"
                        placeholder="Email Address"
                        className="w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <Input
                        id="address"
                        placeholder="Address"
                        rows={3}
                        className="w-full"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <Input
                        id="role"
                        placeholder="Role"
                        rows={3}
                        className="w-full"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default CreateEmployModal;