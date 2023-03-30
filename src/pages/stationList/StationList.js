import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectStationInfo,
  setPageNumber,
} from '../../redux/features/station/stationSlice';
import Station from '../../components/station/singleStation/Station';
import ReactPaginate from 'react-paginate';
import './stationList.css';

const StationList = () => {
  const dispatch = useDispatch();
  const { stations, pageNumber, numberOfPages, paging } =
    useSelector(selectStationInfo);
  const totalRows = paging ? paging.total : 0;

  const changePage = ({ selected }) => {
    dispatch(setPageNumber(selected));
  };

  return (
    <div className=' mt-5 averall-container'>
      <Link to='/stations/addstation'>
        <button className='btn btn-success'>Add new station</button>
      </Link>
      <div className='row'>
        <div className='col-lg-6'>
          <form action='form'>
            <input
              type='search'
              id='form1'
              className='form-control'
              placeholder='Search'
              aria-label='Search'
            />
          </form>
          <div className='table-responsive scrollable '>
            <table className=' table stations-table '>
              <thead className='table-head '>
                <tr>
                  <th scope='col'></th>
                  <th>Station Id</th>
                  <th scope='col'>Station name</th>
                </tr>
              </thead>
              <tbody>
                {stations &&
                  stations.map((station, index) => {
                    return (
                      <Station station={station} index={index} key={index} />
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className=''>
            <div className='row mt-5'>
              <div className='col-lg-6'>
                <p className='data-statistics'>
                  Total Rows: <b>{totalRows}</b> &nbsp;&nbsp;&nbsp; Page:{' '}
                  <b>{totalRows ? pageNumber + 1 : null}</b> of{' '}
                  <b>{numberOfPages}</b>
                </p>
              </div>
              <div className='col-lg-6'>
                <ReactPaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  pageCount={numberOfPages}
                  onPageChange={changePage}
                  containerClassName={' pagination-btn pagination-list'}
                  pageLinkClassName={' pagination-btn btn '}
                  previousClassName={
                    ' pagination-btn btn btn-info previous-button'
                  }
                  nextClassName={' pagination-btn btn btn-info'}
                  activeLinkClassName={' pagination-btn  btn btn-success'}
                  disabledClassName={' pagination-btn  btn btn-light'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationList;
