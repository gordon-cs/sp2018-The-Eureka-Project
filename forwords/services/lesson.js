import axios from 'axios';
import { httpsRoute } from '../constants/API';

async function getLessons() {
    const response = await axios.get(`${httpsRoute}/lesson-list`)
    return response.data;
}

export default {
    getLessons,
}