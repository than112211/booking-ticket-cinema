import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter as Route, useHistory} from "react-router-dom";

function PrivateRouteAdmin({ component:Component, ...rest }) {
    const user = useSelector(state => state.user)
    const history = useHistory()
    
    return (    
        <Route {...rest} >
            {
                user.isLogin && user.user.role === false ? <Component></Component> : history.replace('/')
            }
        </Route>
    );
}

export default PrivateRouteAdmin;