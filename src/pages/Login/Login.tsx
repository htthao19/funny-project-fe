import { Button, Layout, Row } from 'antd';
import React, { memo } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { LoginProps } from './types';
import { asyncLogin } from 'store/modules/user/redux';
import { AppDispatch } from 'store';
import './Login.css'

const Login: React.FC<LoginProps> = memo(props => {
    const dispatch = useDispatch<AppDispatch>();

    const login = useGoogleLogin({
        onSuccess: resp => {
            dispatch(asyncLogin(resp.code, 'postmessage'));
        },
        flow: 'auth-code',
    });

    return (
        <Layout>
            <div className='container-login'>
                <h2>Login to Funny Movies</h2>
                <Button className='btn-google' onClick={() => login()}>Sign in with Google 🚀</Button>
            </div>
            <Row style={{ height: 100 }} />
        </Layout>
    );
});

export default withRouter(Login);
