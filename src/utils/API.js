import {ACCESS_TOKEN, API_BASE_URL} from "../constants/API";
import {request} from "./APIUtils";

// AUTH
export const login = loginRequest => {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: "POST",
        body: JSON.stringify(loginRequest)
    });
};
export const signup = signupRequest => {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: "POST",
        body: JSON.stringify(signupRequest)
    });
};
export const changePassword = changePwRequest => {
    return request({
        url: API_BASE_URL + "/auth/change-password",
        method: "POST",
        body: JSON.stringify(changePwRequest)
    });
};
export const forgetPassword = email => {
    return request({
        url: API_BASE_URL + "/auth/forgot-password",
        method: "POST",
        body: email
    });
};

// USER
export const fetchCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No authenticated");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: "GET"
    });
};
export const changeUserInfo = (changeInfoRequest) => {
    return request({
        url: API_BASE_URL + "/user/change-info",
        method: "POST",
        body: JSON.stringify(changeInfoRequest)
    });
};

// DASHBOARD
export const fetchDashboardInfo = () => {
    return request({
        url: API_BASE_URL + "/dashboard/info",
        method: "GET"
    });
};

// PURCHASE
export const fetchAllProducts = () => {
    return request({
        url: API_BASE_URL + "/product/all",
        method: "GET"
    });
};
export const addTransactions = (transactions) => {
    return request({
        url: API_BASE_URL + "/transaction/add-all",
        method: "POST",
        body: JSON.stringify(transactions)
    });
};
export const addTransaction = (transaction) => {
    return request({
        url: API_BASE_URL + "/transaction/add",
        method: "POST",
        body: JSON.stringify(transaction)
    });
};

// ADMIN
export const fetchAllUsers = () => {
    return request({
        url: API_BASE_URL + "/user/all",
        method: "GET"
    });
};
export const fetchAllCashRegisters = () => {
    return request({
        url: API_BASE_URL + "/user/all-registers",
        method: "GET"
    });
};
export const updateCashRegister = (updateRegisterRequest) => {
    return request({
        url: API_BASE_URL + "/user/update-register",
        method: "POST",
        body: JSON.stringify(updateRegisterRequest)
    });
};
export const updateUserValidation = (updateUserValidationRequest) => {
    return request({
        url: API_BASE_URL + "/user/update-validation",
        method: "POST",
        body: JSON.stringify(updateUserValidationRequest)
    });
};
export const updateUserBalance = (updateUserBalanceRequest) => {
    return request({
        url: API_BASE_URL + "/user/update-balance",
        method: "POST",
        body: JSON.stringify(updateUserBalanceRequest)
    });
};
export const addProduct = (addProductRequest) => {
    return request({
        url: API_BASE_URL + "/product/add",
        method: "POST",
        body: JSON.stringify(addProductRequest)
    });
};
export const updateProduct = (updateProductRequest) => {
    return request({
        url: API_BASE_URL + "/product/update",
        method: "POST",
        body: JSON.stringify(updateProductRequest)
    });
};
export const findLastTransaction = (page, size) => {
    return request({
        url: API_BASE_URL + `/transaction/last?page=${page}&size=${size}`,
        method: "GET",
    });
};
export const deleteTransaction = (transactionId) => {
    return request({
        url: API_BASE_URL + `/transaction/delete?id=${transactionId}`,
        method: "DELETE",
    });
};
