import { Card, Col, Layout, Row } from 'antd';
import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';

import { FunnyMovieProps } from './types';
import { AppDispatch, RootState } from 'store';
import { asyncListVideos, asyncShareVideo } from 'store/modules/video/redux';
import { asyncGetCurrentUser } from 'store/modules/user/redux';
import Header from 'components/Header/Header';
import { Video } from 'types/video';
import { getVideoId } from 'utils/youtube';
import './FunnyMovie.css'


const FunnyMovie: React.FC<FunnyMovieProps> = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const videos = useSelector((state: RootState) => {
		return state.video.videos 
	});
    const currentUser = useSelector((state: RootState) => {
		return state.user.currentUser 
	});

    useEffect(() => {
        dispatch(asyncListVideos())
        dispatch(asyncGetCurrentUser())
	}, [dispatch, videos.length])

    const handleShareMovie = useCallback((url: string) => {
        dispatch(asyncShareVideo(url));
	}, [dispatch]);

    const videoRowRender = useCallback(() => {
        return (
            <Col className='mt-3'>
                {videos.map((video: Video) => {
                    const embedURL = 'https://www.youtube.com/embed/' + getVideoId(video.url);
                    const description = 'Shared by ' + video.sharedBy;
                    return (
                        <Row key={video.id} justify='space-around' align='middle' className='mt-3'>
                            <Card hoverable>
                                <iframe 
                                    title={video.id.toString()}
                                    width='640'
                                    height='360'
                                    src={embedURL}
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                />
                                <Meta title='Movie Title' description={description} />
                            </Card>
                        </Row>
                    )}
                )}
            </Col>
        )
    }, [videos]);

    return (
        <Layout>
            <Header email={currentUser.email} onShareMovieOK={handleShareMovie} />
            <Row justify='space-around' align='middle'>
                {videoRowRender()}
            </Row>
        </Layout>
    );
});

export default withRouter(FunnyMovie);
