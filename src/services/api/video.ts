import Cookies from 'js-cookie';
import { AxiosWithCredentials, Response, parseError } from './base';
import Notification from 'utils/notification';

export interface Video extends Response {
	id: number;
	url: string;
	sharedBy: string;
	description: string;

	createdAt: Date;
	updatedAt: Date;
}

export interface ShareVideoRequest {
    url: string;
}

export async function shareVideo(req: ShareVideoRequest) {
    try {
        const axiosResp = await AxiosWithCredentials.post<Video>(
            process.env.REACT_APP_API_URL + '/v1/rest/videos',
            req
        );
        return axiosResp.data;
    } catch (e: any) {
        throw parseError(e)
    }
}

export interface ListVideosRequest {
    page: number;
    limit: number;
    sort: string;
}
export interface ListVideosResponse extends Response {
    _items: Video[];
}

export async function listVideos(req: ListVideosRequest) {
    try {
        const axiosResp = await AxiosWithCredentials.get<ListVideosResponse>(
            process.env.REACT_APP_API_URL + '/v1/rest/videos',
            {
                params: req
            }
        );
        return axiosResp.data;
    } catch (e: any) {
        throw parseError(e)
    }
}

// WebSocket
const socket = new WebSocket(
	process.env.REACT_APP_API_URL_WEB_SOCKET+'/v1/ws/videos/join'
);

export function connect() {
	socket.onopen = () => {
		let authToken = 'Bearer ' + Cookies.get(process.env.REACT_APP_SESSION_COOKIE_NAME!);
		socket.send(authToken);
	}
	
	socket.onmessage = (msg) => {
        const video: Video = JSON.parse(msg.data)
		Notification.info(video.sharedBy + ' has shared this ' + video.url);
	}

	socket.onclose = (event) => {
		console.log("Socket Closed Connection: ", event)
	}

	socket.onerror = (error) => {
		console.log("Socket Error: ", error)
	}
};

