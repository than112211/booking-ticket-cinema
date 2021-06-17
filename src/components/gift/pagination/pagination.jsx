import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { LITMIT_GIFT } from '../../../constants';
import { increasePageGift, decreasePageGift,setPageGift } from '../../../redux/giftSlice'

function PaginationGift(props) {
    const dispatch = useDispatch()
    const pagination = useSelector(state => state.gift.pagination)
    const totalPages = Math.ceil(pagination.total/LITMIT_GIFT)

    function handleClickNextPage(){
        dispatch(increasePageGift())
    }

    function handleClickPrePage(){
        dispatch(decreasePageGift())
    }

    function handleClickSetPage(page){
        if(pagination.page !== page){
            dispatch(setPageGift(page))
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
                        return <PaginationItem key={index} active={pagination.page == index+1} >
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

export default PaginationGift;