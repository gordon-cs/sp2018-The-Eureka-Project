import axios from 'axios';
import { httpsRoute } from '../constants/API';

async function getMyCourses(email, role) {
    const response = await axios.get(`${httpsRoute}/my-courses/${email}/${role}`);
    return response.data;
}

async function deleteCourse(email, courseID) {
    axios.delete(`${httpsRoute}/delete-course/${email}/${courseID}`);
}

async function removeStudentFromCourse(email, courseID) {
    axios.delete(`${httpsRoute}/unenroll-student/${email}/${courseID}`);
}

async function getCourseRole(email, courseID) {
    const response = await axios.get(`${httpsRoute}/course-role/${email}/${courseID}`);
    return response.data[0].role;
}

export default {
    getMyCourses,
    deleteCourse,
    removeStudentFromCourse,
    getCourseRole,
}