import Axios from 'axios';
import { AxiosWithCredentials, Response, parseError, redirectToLoginPage } from './base';
import Cookies from 'js-cookie';

export interface GetCurrentUserRequest {}
export interface GetCurrentUserResponse extends Response {
    id: number;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export async function getCurrentUser(_: GetCurrentUserRequest) {
    try {
        const axiosResp = await AxiosWithCredentials.get<GetCurrentUserResponse>(
            process.env.REACT_APP_API_URL + '/v1/rest/users/me'
        );
        return axiosResp.data;
    } catch (e: any) {
        throw parseError(e)
    }
}

export async function logout() {
    try {
        Cookies.remove(
            process.env.REACT_APP_SESSION_COOKIE_NAME!
        )
        redirectToLoginPage();
    } catch (e: any) {
        throw parseError(e)
    }
}

export interface LoginRequest {
    code: string;
    redirectURL: string;
}
export interface LoginResponse extends Response {
    token: string;
    name: string;
    avatar: string;
}

export async function login(req: LoginRequest) {
    try {
        const axiosResp = await Axios.post<LoginResponse>(
            process.env.REACT_APP_API_URL + '/v1/rpc/auth/login',
            req,
        );
        Cookies.set(
            process.env.REACT_APP_SESSION_COOKIE_NAME!,
            axiosResp.data.token,
        );

        return axiosResp.data;
    } catch (e: any) {
        throw parseError(e);
    }
}

