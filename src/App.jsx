import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategory } from './redux/categorySlice';
import { getProduct } from './redux/productSlice';
import { addSocket, getMe } from './redux/userSlice';
import RouterList from './routes';
import io from 'socket.io-client';
function App() {
    const dispatch = useDispatch();
    const socket = io(`https://cocoapp-server.herokuapp.com`, { transports: ['websocket'] });

    React.useEffect(() => {
        (async () => {
            await dispatch(getCategory());
            await dispatch(getProduct());
            if (localStorage.getItem('firstLogin')) {
                await dispatch(getMe());
            }
        })();
    }, [dispatch]);

    React.useEffect(() => {
        if (socket) {
            dispatch(addSocket(socket));
        }
    }, [socket]);

    return (
        <div className="h-full">
            <RouterList />
        </div>
    );
}

export default App;
