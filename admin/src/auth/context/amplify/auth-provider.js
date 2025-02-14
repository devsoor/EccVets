import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { Amplify, Auth } from 'aws-amplify';
// config
import { AwsConfig } from 'src/config-global';
//
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------
// console.log("AwsConfig = ", AwsConfig)
const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------
console.log("AwsConfig = ", AwsConfig)

// Auth.configure(AMPLIFY_API);
Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: AwsConfig.cognito.REGION,
        userPoolId: AwsConfig.cognito.USER_POOL_ID,
        identityPoolId: AwsConfig.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: AwsConfig.cognito.APP_CLIENT_ID,
    },
    Storage: {
        region: AwsConfig.s3.REGION,
        bucket: AwsConfig.s3.BUCKET,
        identityPoolId: AwsConfig.cognito.IDENTITY_POOL_ID,
    },
    API: {
        endpoints: AwsConfig.apiGateway.endpoints,
    },
});

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();

      if (currentUser) {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...currentUser,
              id: currentUser.attributes.sub,
              displayName: `${currentUser.attributes.given_name} ${currentUser.attributes.family_name}`,
              role: 'admin',
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const currentUser = await Auth.signIn(email, password);

    dispatch({
      type: 'INITIAL',
      payload: {
        user: {
          ...currentUser,
          id: currentUser.attributes.sub,
          displayName: `${currentUser.attributes.given_name} ${currentUser.attributes.family_name}`,
          role: 'admin',
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        given_name: firstName,
        family_name: lastName,
      },
    });
  }, []);

  // CONFIRM REGISTER
  const confirmRegister = useCallback(async (email, code) => {
    await Auth.confirmSignUp(email, code);
  }, []);

  // RESEND CODE REGISTER
  const resendCodeRegister = useCallback(async (email) => {
    await Auth.resendSignUp(email);
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await Auth.signOut();
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await Auth.forgotPassword(email);
  }, []);

  // NEW PASSWORD
  const newPassword = useCallback(async (email, code, password) => {
    await Auth.forgotPasswordSubmit(email, code, password);
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'amplify',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      newPassword,
      forgotPassword,
      confirmRegister,
      resendCodeRegister,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      newPassword,
      forgotPassword,
      confirmRegister,
      resendCodeRegister,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
