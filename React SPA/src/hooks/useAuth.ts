import { useDispatch, useSelector } from 'react-redux';
import { updateAuthState } from '../redux/authActions';
import { RootState } from '../redux/store';
import { useMsal } from '@azure/msal-react';
import { useConfig } from './useConfig';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthActionStatus, AuthActionTypes, B2CPolicyTypes } from '../types/IConfig';
import { onMethodCall } from '../aspects/loggingAspects';

const useAuthLogic = () => {
    // hooks
    const { instance } = useMsal();
    const dispatch = useDispatch();
    const config = useConfig();

    // selectors (Listening to this state in the component will trigger a re-render when the state changes.)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const error = useSelector((state: RootState) => state.auth.error);

    // helper function to handle the different auth actions
    const handleAuthAction = async (action: AuthActionTypes, request?: any): Promise<void> => {
        let authResponse: AuthenticationResult | void;

        try {
            switch (action) {
                // LOGIN ACTION
                case AuthActionTypes.Login:
                    authResponse = await instance.loginPopup(request);
                    dispatch(
                        updateAuthState({
                            status: AuthActionStatus.Success,
                            user: authResponse.account,
                            token: authResponse.idToken,
                            claims: authResponse.idTokenClaims,
                        }),
                    );
                    break;
                // LOGOUT ACTION
                case AuthActionTypes.Logout:
                    await instance.logoutPopup(request);
                    dispatch(updateAuthState({ status: AuthActionStatus.Success }));
                    break;
                // RESET PASSWORD ACTION
                case AuthActionTypes.ResetPassword:
                    authResponse = await instance.loginPopup(request);
                    dispatch(updateAuthState({ status: AuthActionStatus.Success }));
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(`Error in ${action}`, error);
            throw error;
        }
    };

    const handleLogin = async (): Promise<void> => {
        const loginRequest = {
            scopes: [config.b2c.scopes.read, config.b2c.scopes.write],
        };
        await handleAuthAction(AuthActionTypes.Login, loginRequest);
    };

    const handleLogout = async (): Promise<void> => {
        const logoutRequest = {
            postLogoutRedirectUri: '/',
        };
        await handleAuthAction(AuthActionTypes.Logout, logoutRequest);
    };

    const handleResetPassword = async (): Promise<void> => {
        const resetRequest = {
            authority: config.b2c.getPolicyAuthority(B2CPolicyTypes.ResetPassword),
        };
        await handleAuthAction(AuthActionTypes.ResetPassword, resetRequest);
    };

    return { isAuthenticated, user, error, handleLogin, handleLogout, handleResetPassword };
};

const useAuth = () => {
    const authLogic = useAuthLogic();
    onMethodCall({ target: authLogic }, { key: 'useAuth' }, { args: [] });
    return authLogic;
};

export default useAuth;
