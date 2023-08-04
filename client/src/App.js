import React from 'react'
import {Container} from '@material-ui/core'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
        <Container maxWidth="xl">
            <Navbar/>
            <Routes>
                <Route path="/" exact component={() => <Navigate to="/posts" />} />
                <Route path="/posts" exact component={Home} />
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" component={PostDetails} />
                <Route path="/auth" exact component={() => (!user ? <Auth /> : <Navigate to="/posts/" /> )} />
            </Routes>
        </Container>
    </BrowserRouter>
    )
}

export default App;