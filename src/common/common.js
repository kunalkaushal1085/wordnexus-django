export const BASE_URL = "http://13.43.29.92:8001/api";
// export const origin = "https://admin.furever-pet.com";

export const setToken = (val) => localStorage.setItem("token", val);
export const setUserId = (val) => localStorage.setItem("user_id", val);
export const setEmailLocal = (val) => localStorage.setItem("email", val);

export const getToken = () => localStorage.getItem("token");
export const getUserId = (val) => localStorage.getItem("user_id");
export const getEmail = (val) => localStorage.getItem("email");
