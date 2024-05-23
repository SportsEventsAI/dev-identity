import React from "react";
import { AuthenticationState } from "react-aad-msal";
import { AppProps } from "../../App";
import { LogoutFunction } from "../../authProviders/authProvider";
import { LoginFunction, UnauthenticatedProps } from "./Unauthenticated";

interface WithLoginProps extends AppProps {
  login: LoginFunction;
  logout: LogoutFunction;
  authenticationState: AuthenticationState;
  error: any;
  accountInfo: any;
}

const WithLogin = (
  Wrapped: React.ComponentType<AppProps>,
  Authenticating: React.ComponentType<{}>,
  Unauthenticated: React.ComponentType<UnauthenticatedProps>
) => {
  return ({
    login,
    logout,
    authenticationState,
    error,
    accountInfo,
  }: WithLoginProps): JSX.Element => {
    if (authenticationState === AuthenticationState.InProgress) {
      return <Authenticating />;
    }

    if (
      authenticationState === AuthenticationState.Authenticated &&
      accountInfo
    ) {
      return <Wrapped logout={logout} accountInfo={accountInfo} />;
    }

    // AuthenticationState.Unauthenticated:
    return <Unauthenticated error={error} login={login} />;
  };
};

export default WithLogin;
