import {
  AuthActionEnum,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from './types';
import { AppDispatch } from './../../index';
import { UserService } from './../../../api/UserService';
import { IUser } from './../../../models/IUser';

export const AuthActionCreator = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
  setAuth: (isAuth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: isAuth }),
  setError: (error: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreator.setIsLoading(true));
      setTimeout(async () => {
        const response = await UserService.getUsers();
        const mockUser = response.data.find(
          (user) => user.username === username && user.password === password,
        );

        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);

          dispatch(AuthActionCreator.setUser(mockUser));
          dispatch(AuthActionCreator.setAuth(true));
        } else {
          dispatch(AuthActionCreator.setError('Invalid data'));
        }
        dispatch(AuthActionCreator.setIsLoading(false));
      }, 1000);
    } catch (e) {
      dispatch(AuthActionCreator.setError('Login error'));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreator.setUser({} as IUser));
    dispatch(AuthActionCreator.setAuth(false));
  },
};
