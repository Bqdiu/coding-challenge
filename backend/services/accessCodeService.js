const admin = require('../firebase/firebaseAdmin');
const { sendAccessCodeEmail } = require('./mailer');
// const twilio = require('twilio');
// const { default: formatPhoneNumber } = require('../helper/formatPhoneNumber');

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();
// const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

// Firebase error: Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
const encodeEmail = (email) => email.replace(/\./g, ',');

const createAccessCode = async (email, role) => {
    const code = generateCode();
    try {
        const { success, message } = await sendAccessCodeEmail(email, code);
        if (success) {
            const encodedEmail = encodeEmail(email);

            const newEmployeeRef = admin.ref('user').push();
            const id = newEmployeeRef.key;
            await admin.ref(`user/${encodedEmail}`).set({ code: code, role: role, id });
            return {
                success: true,
                code: code,
                message: 'Successfully'
            };
        }
        else {
            return {
                success: false,
                message: message
            };
        }

    } catch (error) {
        console.error("Error", error);
        return {
            success: false,
            message: error.message
        };
    }
}

const verifyAccessCode = async (email, accessCode) => {
    const encodedEmail = encodeEmail(email);
    const snapshot = await admin.ref(`user/${encodedEmail}`).once('value');
    const data = snapshot.val();
    if (data && data.code === accessCode) {
        await admin.ref(`user/${encodedEmail}`).update({ code: '', status: 'active' });
        return true;
    }
    return false;
}
module.exports = {
    createAccessCode,
    verifyAccessCode
};
