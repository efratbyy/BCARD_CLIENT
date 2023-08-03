import { useState, useCallback, useMemo } from "react";
import {
  deleteUser,
  editUser,
  getUserFromServer,
  getUsers,
  login,
  loginWithGoogle,
  signup,
} from "../services/userApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/LocalStorageService";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors";
import {
  LoginType,
  RegisterType,
  TokenType,
  UserMapToModelType,
} from "../models/types/userTypes";
import normalizeEditUser from "../helpers/normalization/normalizeEditUser";
import { useSnack } from "../../provider/SnackbarProvider";
import UserInterface from "../models/interfaces/UserInterface";
import UserFromGoogle from "../models/interfaces/UserFromGoogle";

type ErrorType = null | string;

const useHandleUsers = () => {
  const [error, setError] = useState<ErrorType>(null);
  const [isLoading, setLoading] = useState(false);
  const snack = useSnack();

  const { user, setUser, setToken } = useUser();

  useAxiosInterceptors();

  const navigate = useNavigate();

  const requestStatus = useCallback(
    (
      loading: boolean,
      errorMessage: ErrorType,
      user: null | TokenType | UserInterface = null
    ) => {
      setLoading(loading);
      setError(errorMessage);
      setUser(user);
    },
    [setUser]
  );

  const handleLogin = useCallback(
    async (user: LoginType) => {
      try {
        setLoading(true);

        const token = await login(user);

        setTokenInLocalStorage(token);
        setToken(token);

        const userFromLocalStorage = getUser();

        requestStatus(false, null, userFromLocalStorage);
        navigate(ROUTES.CARDS);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [setToken, navigate, requestStatus]
  );

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async (user: RegisterType) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeUser(user);
        await signup(normalizedUser);
        await handleLogin({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [handleLogin, requestStatus]
  );

  const handleGetUsers = async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handleGetUser = async (userId: string) => {
    try {
      console.log(userId);

      const user = await getUserFromServer(userId);
      return user;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handelUpdateUser = useCallback(
    async (userFromClient: UserMapToModelType) => {
      try {
        setLoading(true);
        const normalizedUser = normalizeEditUser(userFromClient);
        const userFromServer = await editUser(normalizedUser);
        // requestStatus(false, null, userFromServer);
        snack("success", "The user has been successfully updated");
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    []
  );

  const handleGoogleLogin = useCallback(
    async (token: UserFromGoogle) => {
      try {
        setLoading(true);

        const user_token = await loginWithGoogle(token);

        setTokenInLocalStorage(user_token);
        setToken(user_token);

        const userFromLocalStorage = getUser();

        requestStatus(false, null, userFromLocalStorage);

        navigate(ROUTES.CARDS);
      } catch (error) {
        if (typeof error === "string") requestStatus(false, error, null);
      }
    },
    [setToken, navigate, requestStatus]
  );

  const handelDeleteUser = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      await deleteUser(user ? user._id : "", userId);
      snack("success", "The user has been successfully deleted");
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  const value = useMemo(() => {
    return { isLoading, error, user };
  }, [isLoading, error, user]);

  return {
    value,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    handleSignup,
    handleGetUser,
    handelUpdateUser,
    handleGetUsers,
    handelDeleteUser,
  };
};

export default useHandleUsers;
