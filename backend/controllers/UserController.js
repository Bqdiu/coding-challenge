const { createAccessCode, verifyAccessCode } = require("../services/accessCodeService");
const admin = require('../firebase/firebaseAdmin');
const encodeEmail = (email) => email.replace(/\./g, ',');

const createNewAccessCode = async (req, res) => {
    const { email, role } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }
    try {
        const { success, message } = await createAccessCode(email, role);
        if (success) {
            res.status(200).json({
                success: true,
                message: "Access code sent"
            })
        }
        else {
            res.status(400).json({
                success: false,
                error: message
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const validateAccessCode = async (req, res) => {
    const { email, accessCode } = req.body;
    try {
        const validate = await verifyAccessCode(email, accessCode);
        console.log("validateeee", validate)
        if (validate) {
            res.status(200).json({
                success: true,
                message: "Access code has been verified"
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Incorrect access code"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

}

const createEmployee = async (req, res) => {
    const { name, email, address, role } = req.body;
    try {
        if (!name || !email || !address || !role) {
            res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        // check email exists
        const encodedEmail = encodeEmail(email);
        const emailExist = await admin.ref(`user/${encodedEmail}`).once('value');
        if(emailExist.exists()) {
            res.status(409).json({
                success: false,
                message: "Email already exists"
            })
        }

        const newEmployeeRef = admin.ref('user').push();
        const id = newEmployeeRef.key;
        await admin.ref(`user/${encodedEmail}`).set({ name, address, email, role, id, status: "Inactive" });
        res.status(201).json({
            success: true,
            message: "Employee created successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const snapshot = await admin.ref('user').once('value');
        const data = snapshot.val();

        const employees = Object.keys(data).map(key => ({
            email: key.replace(/,/g, '.'),
            ...data[key]
        }))
            // .filter(user => user.role === "employee");

        res.status(200).json({
            success: true,
            data: employees
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const snapshot = await admin.ref('user')
            .orderByChild('id')
            .equalTo(id)
            .once('value');

        const data = snapshot.val();

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        const employee = Object.keys(data).map(key => ({
            email: key.replace(/,/g, '.'),
            ...data[key]
        }))[0];

        res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    console.log("IDDDDDD", id)
    try {
        const snapshot = await admin.ref('user')
            .orderByChild('id')
            .equalTo(id)
            .once('value');

        const data = snapshot.val();

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        const encodedEmail = Object.keys(data)[0];
        await admin.ref(`user/${encodedEmail}`).remove();

        res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    createNewAccessCode,
    validateAccessCode,
    createEmployee,
    getAllEmployees,
    getEmployee,
    deleteEmployee
};
