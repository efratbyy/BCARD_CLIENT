import React, { useState } from "react";
import { Container } from "@mui/material";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import useHandleUsers from "../hooks/useHandleUsers";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/joi-schema/loginSchema";
import FormLink from "../../forms/components/FormLink";
import { useUser } from "../providers/UserProvider";
import UserFromGoogle from "../models/interfaces/UserFromGoogle";
import { GoogleLogin } from "@react-oauth/google";
import { OAuth2Client } from "google-auth-library";
import { useSnack } from "../../provider/SnackbarProvider";

const LoginPage = () => {
  const { user } = useUser();
  const { handleLogin, handleGoogleLogin } = useHandleUsers();
  // const [userFromGoogle, setUserFromGoogle] = useState<UserFromGoogle | null>(
  //   null
  // );

  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );

  // const handleGoogleLoginSuccess = (response: any) => {
  //   console.log(response);
  //   // You can access user information from the response object
  //   const { profileObj, tokenId } = response;
  //   const { email, name, imageUrl } = profileObj;

  //   // Store user information in state
  //   const newUser: UserFromGoogle = {
  //     email,
  //     name,
  //     imageUrl,
  //   };
  //   setUserFromGoogle(newUser);
  // };

  // const handleGoogleLoginFailure = (error: Error) => {
  //   console.error("Google login failed:", error);
  //   setErrorMessage("An error occurred during login. Please try again.");
  // };

  // const getDecodedOAuthJwtGoogle = async (token: any) => {
  //   const CLIENT_ID_GOOGLE =
  //     "238799202757-utcf1kgstkd14ibbqr67dq4kbd97le4p.apps.googleusercontent.com";

  //   try {
  //     const client = new OAuth2Client(CLIENT_ID_GOOGLE);

  //     const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: CLIENT_ID_GOOGLE,
  //     });
  //     const getPayload = ticket.getPayload();
  //     // console.log(getPayload);
  //     const payload: UserFromGoogle = {
  //       name: String(getPayload!["name"]),
  //       email: String(getPayload!["email"]),
  //     };
  //     console.log(payload);

  //     handleGoogleLogin(token);

  //     return ticket;
  //   } catch (error) {
  //     return { status: 500, data: error };
  //   }
  // };

  const responseMessage = (response: any) => {
    // const realUserData = getDecodedOAuthJwtGoogle(response.credential); // credentials === JWT token

    const tokenObj: UserFromGoogle = { token: response.credential };
    handleGoogleLogin(tokenObj); // הטוקן המוצפן
  };

  const errorMessage = () => {
    console.log("in errorMessage");
  };

  if (user) return <Navigate to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        title="login"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        styles={{ maxWidth: "450px" }}
        spacing={1}
        onFormChange={rest.validateForm}
        to={ROUTES.CARDS}
      >
        <Input
          label="email"
          name="email"
          type="email"
          data={value.data}
          error={value.errors.email}
          onInputChange={rest.handleInputChange}
        />
        <Input
          label="password"
          name="password"
          type="password"
          data={value.data}
          error={value.errors.password}
          onInputChange={rest.handleInputChange}
        />
        <FormLink text="Not registered yet?" to={ROUTES.SIGNUP} />
        <div>
          <br />
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
