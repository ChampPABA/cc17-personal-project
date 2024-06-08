import axios from "../config/axios";

const userApi = {};

userApi.register = (body) => axios.post("/user/register", body);
userApi.login = (body) => axios.post("/user/login", body);
userApi.getAuthUser = () => axios.get("/user/me");

export default userApi;
