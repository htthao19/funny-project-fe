import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from 'pages/Login/Login';
import FunnyMovie from 'pages/FunnyMovie/FunnyMovie';
import './App.css'
import { connect } from 'services/api/video';

const App: React.FC = (() => {
    useEffect(() => {
        connect();
    }, []);
    return (
        <Layout>
            <Layout>
                <BrowserRouter>
                    <Route exact path='/login' component={Login} />
                <Route exact path='/' component={FunnyMovie} />
                </BrowserRouter>
            </Layout>
        </Layout>
    );
});

export default App;
