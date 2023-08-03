import axios from "axios";
import UserType, {
  LoginType,
  NormalizedEditUser,
  UserRegistered,
} from "../models/types/userTypes";
import UserInterface from "../models/interfaces/UserInterface";
import UserFromGoogle from "../models/interfaces/UserFromGoogle";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8180";

export const login = async (user: LoginType) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const loginWithGoogle = async (token: UserFromGoogle) => {
  try {
    const { data } = await axios.post<string>(
      `${apiUrl}/users/loginWithGoogle`,
      token
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const signup = async (normalizedUser: UserType) => {
  try {
    const { data } = await axios.post<UserRegistered>(
      `${apiUrl}/users`,
      normalizedUser
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get<UserInterface[]>(`${apiUrl}/users`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUserFromServer = async (userId: string) => {
  try {
    const { data } = await axios.get<UserInterface>(
      `${apiUrl}/users/${userId}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const editUser = async (normalizedUser: NormalizedEditUser) => {
  try {
    const userToServer = { ...normalizedUser };
    const { data } = await axios.put<UserInterface>(
      `${apiUrl}/users/${userToServer._id}`,
      userToServer
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const deleteUser = async (
  currUserId: string,
  userToDeleteId: string
) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userToDeleteId}`, {
      data: { currUserId },
    });
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
