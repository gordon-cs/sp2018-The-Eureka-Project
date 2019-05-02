import axios from 'axios';
import { httpsRoute } from '../constants/API';

async function getMyCourses(email) {
    const response = await axios.get(`${httpsRoute}/my-courses/${email}`);
    return response.data;
}

async function deleteCourse(email, courseID) {
    axios.delete(`${httpsRoute}/delete-course/${email}/${courseID}`);
    return response.data;
}


export default {
    getMyCourses,
    deleteCourse,
}