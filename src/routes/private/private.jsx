import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter as Route, useHistory} from "react-router-dom";

function PrivateRoute({ component:Component, ...rest }) {
    const isLogin = useSelector(state => state.user.isLogin)
    const history = useHistory()
    return (    
        <Route {...rest} >
            {
               isLogin === true ? <Component></Component> : history.replace('/')
            }
        </Route>
    );
}

export default PrivateRoute;