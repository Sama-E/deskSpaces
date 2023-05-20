import axios from "axios";

//create base url
//send access token (credentials) to backend
//to receive posts associated with user
export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials:true,
});