import axios from 'axios';
import { httpsRoute } from '../constants/API';

async function getUserInfo(email) {
    const response = await axios.get(`${httpsRoute}/${email}`)
    return response.data[0];
}

async function getStudents(email, courseID) {
    const response = await axios.get(`${httpsRoute}/student-list/${email}/${courseID}`)
    return response.data;
}

export default {
    getUserInfo,
    getStudents,
}