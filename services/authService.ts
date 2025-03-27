import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  language: string;
  banned: boolean;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  firstName: string;
  lastName: string;
}
export const register = async (data: RegisterData): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>("/auth/register", data);
    await AsyncStorage.setItem("accessToken", response.data.token);
    await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    // console.log("User registered:", response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
export const login = async (data: LoginData): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", data);
    await AsyncStorage.setItem("accessToken", response.data.token);
    await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    // console.log("User logged in:", response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("user");
    // console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem("user");
    if (userJson) return JSON.parse(userJson);
    return null;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return !!token;
  } catch (error) {
    console.error("Check auth error:", error);
    return false;
  }
};
