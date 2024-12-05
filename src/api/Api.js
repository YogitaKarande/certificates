import axios from 'axios';
const BASE_URL = '13223'

// API

/*****
* Used to register
* @postData -> form data ( api, formadata)
*/

export const makeEnquiry = async (postData) => {
    try {
        postData.api = 'enquiry'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

/*****
* Used to login
* @postData -> form data ( api, mobile_no , password)
*/

export const login = async (postData) => {
    try {
        postData.api = 'login'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

/*****
* Used to get certificates
* @postData -> form data ( api, page)
*/

export const getCertificates = async (page) => {
    try {
        const postData = {
            api: 'get-certificates',
            page: page
        };
        const response = await axios.get(BASE_URL, {
            params: postData
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

/*****
* Used to get certificates details
* @postData -> form data ( api, certificate , slug)
*/

export const getCertificatesDetails = async (page) => {
    try {
        const postData = {
            api: 'get-certificates',
            page: page
        };
        const response = await axios.get(BASE_URL, {
            params: postData
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

/*****
* Used to get certificates details
* @postData -> form data ( api, certificate id ,token)
*/

export const applyCertificate = async (postData) => {
    try {
        postData.api = 'apply'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

/*****
* Used to get my certificates details
* @postData -> form data ( api, certificate id ,token)
*/

export const myCertificates = async (postData) => {
    try {
        postData.api = 'apply'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

/*****
* Used to change password
* @postData -> form data ( api, token , new_password, confirm_password)
*/

export const changePassword = async (postData) => {
    try {
        postData.api = 'change-password'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

/*****
* Used to forgot password
* @postData -> form data ( api, email)
*/

export const forgetPassword = async (postData) => {
    try {
        postData.api = 'forget-password'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

/*****
* Used to reset password
* @postData -> form data ( api, email)
*/

export const resetPassword = async (postData) => {
    try {
        postData.api = 'reset-password'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

/*****
* Used to register
* @postData -> form data ( api, formadata)
*/

export const register = async (postData) => {
    try {
        postData.api = 'reset-password'
        const response = await axios.post(BASE_URL, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}