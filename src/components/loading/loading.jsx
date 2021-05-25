import React from 'react';
import PropTypes from 'prop-types';
import loading from '../../resourses/img/loading.gif'
import { useSelector } from 'react-redux';
import './loading.scss'

Loading.propTypes = {
    
};

function Loading(props) {
    const status = useSelector(state => state.loading)
    return (
        <div className="loading" style={{display: status ? 'block' : 'none'}}>
            <img src={loading} alt="loading" srcset="" />
        </div>
    );
}

export default Loading;