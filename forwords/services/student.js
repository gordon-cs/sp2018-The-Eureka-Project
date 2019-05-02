import axios from 'axios';
import { httpsRoute } from '../constants/API';

async function getStudents(email, courseID) {
    const response = await axios.get(`${httpsRoute}/student-list/${email}/${courseID}`)
    return response.data;
}

export default {
    getStudents,
}