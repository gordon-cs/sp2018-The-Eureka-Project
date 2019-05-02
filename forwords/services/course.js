import axios from 'axios';
import { httpsRoute } from '../constants/API';

async function getMyCourses(email) {
    const response = await axios.get(`${httpsRoute}/my-courses/${email}`);
    return response.data;
}

async function deleteCourse(email, courseID) {
    axios.delete(`${httpsRoute}/delete-course/${email}/${courseID}`);
}

async function getCourseRole(email, courseID) {
    const response = await axios.get(`${httpsRoute}/course-role/${email}/${courseID}`);
    return response.data[0].role;
}

export default {
    getMyCourses,
    deleteCourse,
    getCourseRole,
}