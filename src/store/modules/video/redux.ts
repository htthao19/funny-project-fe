import { APIError } from 'services/api/base';
import * as VideoSvc from 'services/api/video';
import Notification from 'utils/notification';
import { Dispatch } from "react";
import { Video } from "types/video";

export interface VideoState {
	videos: Video[],
	loading: boolean,
}

const initialState: VideoState = {
	videos: [],
	loading: false,
}

// LIST_VIDEOS action.

const LIST_VIDEOS = '@@Video/LIST_VIDEOS';
const LIST_VIDEOS_SUCCESS = '@@Video/LIST_VIDEOS_SUCCESS';
const LIST_VIDEOS_FAIL = '@@Video/LIST_VIDEOS_FAIL';

interface ListVideosAction {
	type: typeof LIST_VIDEOS;
}

interface ListVideosSuccessAction {
	type: typeof LIST_VIDEOS_SUCCESS;
	videos: Video[];
}

interface ListVideosFailAction {
	type: typeof LIST_VIDEOS_FAIL;
	error: APIError;
}

function listVideos(): ListVideosAction {
	return {
		type: LIST_VIDEOS,
	};
}

function listVideosSuccess(videos: Video[]): ListVideosSuccessAction {
	return {
		type: LIST_VIDEOS_SUCCESS,
		videos: videos,
	};
}

function listVideosFail(error: APIError): ListVideosFailAction {
	return {
		type: LIST_VIDEOS_FAIL,
		error: error,
	};
}

function listVideoReducer(
	state = initialState,
	action: VideoActionTypes
) {
	switch (action.type) {
		case LIST_VIDEOS:
			return state;
		case LIST_VIDEOS_SUCCESS:
			return {
				...state,
				videos: action.videos,
			};
		case LIST_VIDEOS_FAIL:
			Notification.apiError("ListVideo", action.error);
			return state;

		default:
			return state;
	}
}

export function asyncListVideos() {
	return async function (dispatch: Dispatch<ListVideosAction | ListVideosSuccessAction | ListVideosFailAction>) {
		dispatch(listVideos());

		try {
			const resp = await VideoSvc.listVideos({
				page: 1,
				limit: 200,
				sort: ''
			});

			dispatch(listVideosSuccess(resp._items));
		} catch (e: any) {
			dispatch(listVideosFail(e));
		}
	}
}

// SHARE_VIDEO action.

const SHARE_VIDEO = '@@Video/SHARE_VIDEO';
const SHARE_VIDEO_SUCCESS = '@@Video/SHARE_VIDEO_SUCCESS';
const SHARE_VIDEO_FAIL = '@@Video/SHARE_VIDEO_FAIL';

interface ShareVideoAction {
	type: typeof SHARE_VIDEO;
}

interface ShareVideoSuccessAction {
	type: typeof SHARE_VIDEO_SUCCESS;
	videos: Video[];
}

interface ShareVideoFailAction {
	type: typeof SHARE_VIDEO_FAIL;
	error: APIError;
}

function shareVideo(): ShareVideoAction {
	return {
		type: SHARE_VIDEO,
	};
}

function shareVideoSuccess(videos: Video[]): ShareVideoSuccessAction {
	return {
		type: SHARE_VIDEO_SUCCESS,
		videos: videos,
	};
}

function shareVideoFail(error: APIError): ShareVideoFailAction {
	return {
		type: SHARE_VIDEO_FAIL,
		error: error,
	};
}

function shareVideoReducer(
	state = initialState,
	action: VideoActionTypes
) {
	switch (action.type) {
		case SHARE_VIDEO:
			return state;
		case SHARE_VIDEO_SUCCESS:
			return {
				...state,
				videos: action.videos,
			};
		case SHARE_VIDEO_FAIL:
			Notification.apiError("ShareVideo", action.error);
			return state;

		default:
			return state;
	}
}

export function asyncShareVideo(url: string) {
	return async function (dispatch: Dispatch<ShareVideoAction | ShareVideoSuccessAction | ShareVideoFailAction>) {
		dispatch(shareVideo());

		try {
			await VideoSvc.shareVideo({
				url: url
			});

			const resp = await VideoSvc.listVideos({
				page: 1,
				limit: 200,
				sort: ''
			});

			dispatch(shareVideoSuccess(resp._items));
		} catch (e: any) {
			dispatch(shareVideoFail(e));
		}
	}
}

export default function videoReducer(
	state: VideoState = initialState,
	action: VideoActionTypes
) {
	switch (action.type) {
		case LIST_VIDEOS:
		case LIST_VIDEOS_SUCCESS:
		case LIST_VIDEOS_FAIL:
			return listVideoReducer(state, action)

		case SHARE_VIDEO:
		case SHARE_VIDEO_SUCCESS:
		case SHARE_VIDEO_FAIL:
			return shareVideoReducer(state, action)

		default:
			return state;
	}
}

type VideoActionTypes = ListVideosAction | ListVideosSuccessAction | ListVideosFailAction |
	ShareVideoAction | ShareVideoSuccessAction | ShareVideoFailAction;
