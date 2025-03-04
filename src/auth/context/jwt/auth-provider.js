'use client';

import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { useDispatch } from 'src/app/redux/store';
import { resetAuth, setAuth, setTokens, setUser } from 'src/app/redux/slices/authSlice';
import { setProfileData } from 'src/app/redux/slices/profileSlice';
import { useGetProfileQuery, useGetTemplateDetailsQuery } from 'src/app/redux/slices/apiSlice';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

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
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'FORGOT_PASSWORD') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === 'RESET_PASSWORD') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === 'VERIFY_EMAIL') {
    return {
      ...state,
      user: { ...state.user, isEmailVerified: true },
    };
  }
  if (action.type === 'RESEND_CODE') {
    return {
      ...state,
    };
  }
  if (action.type === 'CREATE_SLUG') {
    return {
      ...state,
    };
  }
  if (action.type === 'CREATE_PROFILE') {
    return {
      ...state,
      user: { ...state.user, isProfileCreated: true },
    };
  }
  if (action.type === 'SELECT_TEMPLATE') {
    return {
      ...state,
      user: { ...state.user, isTemplateSelected: true },
    };
  }
  if (action.type === 'SELECT_PRICING') {
    return {
      ...state,
      user: { ...state.user, isPricingSelected: true },
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

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  // const {
  //   data: templateDetails,
  //   error: errorDetails,
  //   isLoading: isLoadingDetails,
  // } = useGetTemplateDetailsQuery();

  // const { data: profile, error, isLoading } = useGetProfileQuery();
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchRedux = useDispatch();
  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get(endpoints.auth.me);
        console.log('response: initialize', response);
        const { user } = response.data.data;
        dispatchRedux(setUser(user));
        dispatchRedux(setTokens({ accessToken }));
        dispatch({
          type: 'INITIAL',
          payload: {
            user,
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
    } catch (e) {
      console.error(e);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, [dispatchRedux]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(
    async (email, password) => {
      const data = {
        email,
        password,
      };

      const response = await axios.post(endpoints.auth.login, data);
      console.log('response.data.data', response.data.data);
      const { tokens, user } = response.data.data;
      const authData = {
        tokens,
        user,
      };
      console.log('authData', authData);
      setSession(tokens.accessToken);
      dispatchRedux(setAuth(authData));
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    },
    [dispatchRedux]
  );

  // REGISTER
  const register = useCallback(
    async (email, password, fullName) => {
      const data = {
        email,
        password,
        fullName,
      };

      const response = await axios.post(endpoints.auth.register, data);
      console.log('response.data.data', response.data.data);

      const { accessToken, refreshToken, user } = response.data.data;

      const authData = {
        tokens: { accessToken, refreshToken },
        user,
      };
      console.log('authData', authData);
      dispatchRedux(setAuth(authData));
      setSession(accessToken);
      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    },
    [dispatchRedux]
  );

  // FORGOT_PASSWORD
  const forgotPassword = useCallback(async (email) => {
    const data = {
      email,
    };

    const response = await axios.post(endpoints.auth.forgotPassword, data);
    console.log('response.data', response.data);
    if (response.data.status === 200) {
      dispatch({
        type: 'FORGOT_PASSWORD',
      });
      return {
        error: '',
        success: response?.data?.data?.message,
      };
    }
    dispatch({
      type: 'FORGOT_PASSWORD',
    });
    return {
      error: response?.data?.data?.message,
      success: '',
    };
  }, []);

  // RESET_PASSWORD
  const resetPassword = useCallback(async (data) => {
    console.log('data', data);
    const response = await axios.post(endpoints.auth.resetPassword, data);
    console.log('response', response);
    console.log('response.data', response.data);
    if (response.status === 200) {
      dispatch({
        type: 'RESET_PASSWORD',
      });
      return {
        error: '',
        success: response?.data?.message,
      };
    }
    dispatch({
      type: 'RESET_PASSWORD',
    });
    return {
      error: response?.data?.message,
      success: '',
    };
  }, []);

  // VERIFY_CODE
  const verifyEmail = useCallback(
    async (data) => {
      console.log('data', data);
      const response = await axios.post(endpoints.auth.verify, data);
      console.log('response', response);
      console.log('response.data', response.data);
      if (response.status === 200) {
        initialize();
        dispatch({
          type: 'VERIFY_EMAIL',
        });
        return {
          error: '',
          success: response?.data?.message,
        };
      }

      return {
        error: response?.data?.message,
        success: '',
      };
    },
    [initialize]
  );
  // RESEND_CODE
  const resendCode = useCallback(async (data) => {
    console.log('data', data);
    const response = await axios.post(endpoints.auth.resendCode, data);
    console.log('response', response);
    console.log('response.data', response.data);
    if (response.status === 200) {
      dispatch({
        type: 'RESEND_CODE',
      });
      return {
        error: '',
        success: response?.data?.message,
      };
    }
    dispatch({
      type: 'RESEND_CODE',
    });
    return {
      error: response?.data?.message,
      success: '',
    };
  }, []);

  // CREATE_SLUG
  const createSlug = useCallback(
    async (data) => {
      console.log('data', data);
      const response = await axios.post(endpoints.auth.createSlug, data);
      console.log('response', response);
      console.log('response.data', response.data);
      if (response.status === 200) {
        initialize();
        dispatch({
          type: 'CREATE_SLUG',
        });
        return {
          error: '',
          success: response?.data?.message,
        };
      }

      return {
        error: response?.data?.message,
        success: '',
      };
    },
    [initialize]
  );
  // CREATE_PROFILE
  const createProfile = useCallback(
    async (data) => {
      console.log('data', data);
      const response = await axios.post(endpoints.profile.create, data);
      console.log('response', response);
      console.log('response.data', response.data);
      if (response.status === 200) {
        initialize();
        dispatchRedux(setProfileData(response.data.data));
        dispatch({
          type: 'CREATE_PROFILE',
        });
        return {
          error: '',
          success: response?.data?.message,
        };
      }

      return {
        error: response?.data?.message,
        success: '',
      };
    },
    [initialize, dispatchRedux]
  );

  // SELECT_TEMPLATE
  const selectTemplate = useCallback(
    async (templateId) => {
      console.log('templateId', templateId);
      const response = await axios.get(endpoints.template.select(templateId));
      console.log('response', response);
      if (response.status === 200) {
        initialize();
        dispatch({
          type: 'SELECT_TEMPLATE',
        });
        return {
          error: '',
          success: response?.data?.message,
        };
      }

      return {
        error: response?.data?.message,
        success: '',
      };
    },
    [initialize]
  );
  // SELECT_PRICING
  const selectPricing = useCallback(
    async (data) => {
      console.log('data', data);
      const response = await axios.post(endpoints.pricing.select, data);
      console.log('response', response);
      if (response.status === 200) {
        initialize();
        dispatch({
          type: 'SELECT_PRICING',
        });
        return {
          error: '',
          success: response?.data?.message,
        };
      }

      return {
        error: response?.data?.message,
        success: '',
      };
    },
    [initialize]
  );

  // LOGOUT
  const logout = useCallback(
    async (userId) => {
      const data = { userId };
      const response = await axios.get(endpoints.auth.signOut);
      setSession('');
      dispatchRedux(resetAuth());
      dispatchRedux({ type: 'RESET' });
      dispatch({
        type: 'LOGOUT',
      });
    },
    [dispatchRedux]
  );

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
      resetPassword,
      forgotPassword,
      verifyEmail,
      resendCode,
      createSlug,
      createProfile,
      selectTemplate,
      selectPricing,
    }),
    [
      login,
      logout,
      register,
      resetPassword,
      forgotPassword,
      verifyEmail,
      resendCode,
      createSlug,
      createProfile,
      selectTemplate,
      selectPricing,
      state.user,
      status,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
