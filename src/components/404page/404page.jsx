import React from 'react';
import img_404 from '../../resourses/img/404page.png'
import './404page.scss'

function Page404(props) {
    return (
        <div className="page__404">
            <img src={img_404} alt="Anh lỗi" />
        </div>
    );
}

export default Page404;