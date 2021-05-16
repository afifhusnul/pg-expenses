import axios from "axios";

require('dotenv').config();
export default axios.create({
  baseURL: 'http://192.168.200.100:5000/api/',
  responseType: "json"
});

