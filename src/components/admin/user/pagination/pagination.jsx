import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { LIMIT_USER_ADMIN } from '../../../../constants';
import { increasePageUser,decreasePageUser,setPageUser } from '../../../../redux/adminSlice'

function PaginationUser(props) {
    const dispatch = useDispatch()
    const pagination = useSelector(state => state.admin.users.paginationUser)
    const totalPages = Math.ceil(pagination.total/LIMIT_USER_ADMIN)

    function handleClickNextPage(){
        dispatch(increasePageUser())
    }

    function handleClickPrePage(){
        dispatch(decreasePageUser())
    }

    function handleClickSetPage(page){
        if(pagination.page !== page){
            dispatch(setPageUser(page))
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

export default PaginationUser;