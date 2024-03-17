import Axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

function isAxiosError<T>(error: Error | AxiosError<T>): error is AxiosError<T> {
	return (error as AxiosError<T>).isAxiosError !== undefined;
}

export interface APIResponseError {
	_errorStatus: string;
	_errorMessage: string;
	_errorDetails?: any;
}

export interface APIError extends Error {
	status?: string;
	details?: any;
}

export interface RestListRequest {
	total: number;
	page: number;
	limit: number;
}

export interface Response extends APIError { }

export interface RestListResponse {
	_range: RestListResponseMetadata;
}

export interface RestListResponseMetadata extends Response {
	limit: number[];
	offset: number[];

	hasNext: boolean;
	hasPrevious: boolean;
	startCursor: string;
	endCursor: string;
}

export function parseError(error: Error | AxiosError<any>): APIError {
	if (isAxiosError<APIResponseError>(error) && error.response) {
		let apiError = error.response.data;
		return {
			status: apiError._errorStatus,
			message: apiError._errorMessage,
			details: apiError._errorDetails,
			name: error.name,
			stack: error.stack,
		};
	}

	return {
		status: 'ERR_UNKNOWN',
		message: 'Oops something went wrong.',
		details: error.message,
		name: error.name,
		stack: error.stack,
	};
}

export let AxiosWithCredentials = Axios.create({
    withCredentials: true
});

AxiosWithCredentials.interceptors.response.use(
    (response: AxiosResponse<any>): Promise<AxiosResponse<any>> => {
        return Promise.resolve(response);
    },
    async (error: AxiosError<any>): Promise<AxiosResponse<any>> => {
		const token = Cookies.get(
			process.env.REACT_APP_SESSION_COOKIE_NAME!
		); 
        if (!token || error.response?.status === 401) {
            redirectToLoginPage();
        }
        return Promise.reject(error);
    }
);

AxiosWithCredentials.interceptors.request.use(function (config) {
    const token = Cookies.get(
		process.env.REACT_APP_SESSION_COOKIE_NAME!
	);
    config.headers.Authorization = 'Bearer ' + token;
     
    return config;
});

export function redirectToLoginPage() {
    window.location.href = '/login';
}
