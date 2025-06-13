import axios from "axios";

const URL = `${process.env.REACT_APP_BACKEND_URL}/api/`;

export const createAccessCode = async (email, role) => {
    try {
        console.log("Email", email);
        const url = URL + "create-new-access-code";
        console.log("url", url);
        const res = await axios.post(url, { email, role });
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        return { error: true, message: error.response.data.message || error };
    }
};


export const validateAccessCode = async (email, accessCode) => {
    try {
        const url = URL + "validate-access-code";
        const res = await axios.post(url, { email, accessCode });
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        return { error: true, message: error.response.data.message || error };
    }
}

export const getAllEmployees = async () => {
    try {
        const url = URL + "get-all-employees";
        const res = await axios.get(url);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        return { error: true, message: error.response.data.message || error };
    }
}

export const getEmployee = async (id) => {
    try {
        const url = URL + `get-employee/${id}`;
        const res = await axios.get(url);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        return { error: true, message: error.response.data.message || error };
    }
}

export const createEmployee = async (payload) => {
    const { name, email, address, role } = payload;
    try {
        const url = URL + "create-employee";
        const res = await axios.post(url, { name, email, address, role });
        if (res.status === 201) {
            return res.data;
        }
    } catch (error) {
        return { error: true, message: error.response.data.message || error };
    }
}

export const deleteEmployee = async (id) => {
    try {
        const url = URL + `delete-employee/${id}`;
        const res = await axios.delete(url);
        return res.data;
    } catch (error) {
        return { error: true, message: error.response?.data?.message || error.message };
    }
};