import axios from 'axios';

export default axios.create({ baseURL: 'http://ec2-34-207-78-170.compute-1.amazonaws.com:8080' });