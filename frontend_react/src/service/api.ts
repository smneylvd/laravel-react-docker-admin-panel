import axios from 'axios';
import {User} from "../pages/Users/types";

// const per_page = process.env.REACT_APP_ORDERS_PER_PAGE;
const baseURL = process.env.REACT_APP_ADMIN_API_BASE_URL;

const instance = axios.create({
    baseURL: baseURL
});

instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");
    if (token) {
        request.headers!["Authorization"] = `Bearer ${token}`;
    }
    request.headers!["Content-Type"] = "application/json";

    return request;
});
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    }
);


export const authApi = {
    login(body: { email: string, password: string }) {
        return instance.post(`/api/login`, body);
    },
    register(body: { email: string, password: string, companyName: string }) {
        return instance.post(`/api/register`, body);
    },
};


export const usersApi = {
    search(body: {
        uuid: string,
        first_name: string,
        last_name: string,
        email: string,
        orderBy: string,
        orderByDirection: string,
        per_page: number,
        page: number,
    }) {
        console.log("API", body);
        let query = `api/users?`;
        if (body.uuid) {
            query += `uuid=${body.uuid}&`;
        }
        if (body.first_name) {
            query += `first_name=${body.first_name}&`;
        }
        if (body.last_name) {
            query += `last_name=${body.last_name}&`;
        }
        if (body.email) {
            query += `email=${body.email}&`;
        }
        if (body.orderBy) {
            query += `orderBy=${body.orderBy}&`;
        }
        if (body.orderByDirection) {
            query += `orderByDirection=${body.orderByDirection}&`;
        }
        if (body.page) {
            query += `page=${body.page}&`;
        }
        if (body.per_page) {
            query += `per_page=${body.per_page}&`;
        }
        return instance.get(query);
    },
    getUsers() {
        return instance.get(`api/users?per_page=10`);
    },
    getUser(body: { uuid: string }) {
        return instance.get(`api/users/${body.uuid}`);
    },
    updateUser(body: Partial<User>) {
        return instance.post(`api/users/${body.uuid}`, body)
    },
    deleteUser(body: Partial<User>) {
        return instance.delete(`api/users/${body.uuid}`)
    },
    restoreUser(body: Partial<User>) {
        return instance.get(`api/users/${body.uuid}/restore`)
    }
};