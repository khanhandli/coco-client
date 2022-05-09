import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategory } from './redux/categorySlice';
import { getProduct } from './redux/productSlice';
import { getMe } from './redux/userSlice';
import RouterList from './routes';

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        (async () => {
            await dispatch(getCategory());
            await dispatch(getProduct());
            if (localStorage.getItem('firstLogin')) {
                await dispatch(getMe());
            }
        })();
    }, []);

    return (
        <div className="h-full">
            <RouterList />
        </div>
    );
}

export default App;
