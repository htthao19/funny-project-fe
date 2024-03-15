import { User } from "types/user";
import { APIError } from 'services/api/base';
import * as UserSvc from 'services/api/user';
import Notification from 'utils/notification';
import { Dispatch } from "react";

export interface UserState {
	currentUser: User,
	loading: boolean,
}

const initialState: UserState = {
	currentUser: new User(),
	loading: false,
}

// GET_CURRENT_USER action.

const GET_CURRENT_USER = '@@User/GET_CURRENT_USER';
const GET_CURRENT_USER_SUCCESS = '@@User/GET_CURRENT_USER_SUCCESS';
const GET_CURRENT_USER_FAIL = '@@User/GET_CURRENT_USER_FAIL';

interface GetCurrentUserAction {
	type: typeof GET_CURRENT_USER;
}

interface GetCurrentUserSuccessAction {
	type: typeof GET_CURRENT_USER_SUCCESS;
	user: User;
}

interface GetCurrentUserFailAction {
	type: typeof GET_CURRENT_USER_FAIL;
	error: APIError;
}

function getCurrentUser(): GetCurrentUserAction {
	return {
		type: GET_CURRENT_USER,
	};
}

function getCurrentUserSuccess(user: User): GetCurrentUserSuccessAction {
	return {
		type: GET_CURRENT_USER_SUCCESS,
		user: user,
	};
}

function getCurrentUserFail(error: APIError): GetCurrentUserFailAction {
	return {
		type: GET_CURRENT_USER_FAIL,
		error: error,
	};
}

function getCurrentUserReducer(
	state = initialState,
	action: UserActionTypes
): UserState {
	switch (action.type) {
		case GET_CURRENT_USER:
			return state;
		case GET_CURRENT_USER_SUCCESS:
			return {
				...state,
				currentUser: action.user,
			};
		case GET_CURRENT_USER_FAIL:
			Notification.apiError("GetCurrentUser", action.error);
			return state;

		default:
			return state;
	}
}

export function asyncGetCurrentUser() {
	return async function (dispatch: Dispatch<GetCurrentUserAction | GetCurrentUserSuccessAction | GetCurrentUserFailAction>) {
		dispatch(getCurrentUser());

		try {
			const resp = await UserSvc.getCurrentUser({});

			dispatch(getCurrentUserSuccess(resp));
		} catch (e: any) {
			dispatch(getCurrentUserFail(e));
		}
	}
}

export default function userReducer(
	state: UserState = initialState,
	action: UserActionTypes
) {
	switch (action.type) {
		case GET_CURRENT_USER:
		case GET_CURRENT_USER_SUCCESS:
		case GET_CURRENT_USER_FAIL:
			return getCurrentUserReducer(state, action)

		default:
			return state;
	}
}

// LOGIN action.

const LOGIN = '@@User/LOGIN';
const LOGIN_SUCCESS = '@@User/LOGIN_SUCCESS';
const LOGIN_FAIL = '@@User/LOGOUT_FAIL';

interface LoginAction {
    type: typeof LOGIN;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    nextUrl: string;
}

interface LoginFailAction {
    type: typeof LOGIN_FAIL;
    error: APIError;
}

export function login(): LoginAction {
    return {
        type: LOGIN,
    };
}

export function loginSuccess(nextUrl: string): LoginSuccessAction {
    return {
        type: LOGIN_SUCCESS,
        nextUrl: nextUrl,
    };
}

export function loginFail(error: APIError): LoginFailAction {
    return {
        type: LOGIN_FAIL,
        error: error
    };
}

export function loginReducer(
    state = initialState,
    action: UserActionTypes
) {
    switch (action.type) {
        case LOGIN:
            return state;

        case LOGIN_SUCCESS:
            if (action.nextUrl && action.nextUrl !== '') {
                window.location.href = decodeURIComponent(action.nextUrl);
            }
            return state;

        case LOGIN_FAIL:
            Notification.apiError('Login', action.error);
            return state;

        default:
            return state
    }
}

export function asyncLogin(code: string, redirectURL: string){
    return async function (dispatch: Dispatch<LoginAction | LoginSuccessAction | LoginFailAction>) {
        dispatch(login())

        try {
            await UserSvc.login({
                code: code,
				redirectURL: redirectURL,
            });
			window.location.replace("/")
            dispatch(loginSuccess(''));
        } catch (e: any) {
            dispatch(loginFail(e))
        }
    }
}

type UserActionTypes = GetCurrentUserAction | GetCurrentUserSuccessAction | GetCurrentUserFailAction |
	LoginAction | LoginSuccessAction | LoginFailAction;
