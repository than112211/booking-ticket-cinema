import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { LITMIT_MOVIE } from '../../constants';
import {increasePage,decreasePage,setPage } from '../../redux/paginationSlice'
import './pagination.scss'

function PaginationPage(props) {
    const dispatch = useDispatch()
    const pagination = useSelector(state => state.pagination)
    const totalPages = Math.ceil(pagination.total/LITMIT_MOVIE)

    function handleClickNextPage(){
        dispatch(increasePage())
    }

    function handleClickPrePage(){
        dispatch(decreasePage())
    }

    function handleClickSetPage(page){
        if(pagination.page !== page){
            dispatch(setPage(page))
        }
    }

    return (
        <div className="pagination__container">
            <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={pagination.page <= 1}>
                    <PaginationLink previous onClick={handleClickPrePage}/>
                </PaginationItem>
                {
                    [...Array(totalPages)].map((page,index) => {
                        return <PaginationItem active={pagination.page == index+1} >
                                    <PaginationLink onClick={() => handleClickSetPage(index+1)}>
                                    {index+1}
                                    </PaginationLink>
                                </PaginationItem>
                    })
                }
                <PaginationItem disabled={pagination.page >= totalPages} >
                    <PaginationLink next onClick={handleClickNextPage}/>
                </PaginationItem>
            </Pagination>
        </div>
    );
}

export default PaginationPage;