import { apiClient } from "../api/clients";
import type { User } from "../types/user";


export const userKeys = {
    all: ["users"] as const,
};


export const fetchUsers = async (): Promise<User[]> => {
    const response = await apiClient.get("/users");
    return response.data;
};


