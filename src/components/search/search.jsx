import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './search.scss'

function Search(props) {
    const {t} = useTranslation();
    const result = useSelector(state => state.search.result)
    const search = useSelector(state => state.search.search)
    
    const resultItem = result.map((movie,index) => {
        return  <div key={movie._id} className="col-12 col-sm-12 col-md-6">
                    <div className="movie__item">
                        <Link to={`/movie/${movie.slug}`}>
                            <div className="movie__img">
                                <img src={movie.image} alt="anh phim" />
                            </div>
                        </Link>
                        <div className="movie__info">
                            <div className="movie__text">
                                    <h1>{movie.name}</h1>
                                    <p>{movie.decription}</p>
                            </div>
                            <Button className="btn__buy"><Link to={`/movietime/${movie.slug}`}>{t('movie.buy')}</Link></Button>
                        </div>
                    </div>
                </div>
    })
    
    const notify = `${t('search.search_start')}${`"${search}"`}${t('search.search_center')}${result.length}${t('search.search_end')}`
    return (
        <div className="search">
            <div className="container movie__container">
                <h1 className="search__notify">
                    { result && result.length ? notify : t('search.nothing') }
                </h1>
                <div className="movie__content result__search">
                    <div className="row">
                        {resultItem}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;