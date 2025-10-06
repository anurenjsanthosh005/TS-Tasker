import type { LoginFormInputs, LoginResponse } from "../../types";
import api from "../api";

export const LoginUser = async (data:LoginFormInputs) => {

    try {
        return await api.post<LoginResponse>("/login", {
            username: data.username,
            password: data.password,
        });
    } catch (error: any) {
        console.error("Error adding task:", error.message || error);
        throw error; // Let caller handle it too
    }

}

