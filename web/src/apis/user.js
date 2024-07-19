import axios from "../config/axios";

const userApi = {};

userApi.register = (body) => axios.post("/user/register", body);
userApi.login = (body) => axios.post("/user/login", body);
userApi.getAuthUser = () => axios.get("/user/me");
userApi.verifyOtp = (body) => axios.post("/user/verify-otp", body);
userApi.requestOtp = (body) => axios.post("/user/request-otp", body);
userApi.changePassword = (body) => axios.post("/user/change-password", body);

export default userApi;
