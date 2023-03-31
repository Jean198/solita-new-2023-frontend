import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTripInfo,
  setPageNumber,
} from '../../redux/features/trip/tripSlice';
import ReactPaginate from 'react-paginate';
import SingleTrip from '../../components/trip/singleTrip/SingleTrip';
import Spinner from '../../components/spinner/Spinner';
import './tripList.css';

const TripList = () => {
  const dispatch = useDispatch();
  const {
    trips,
    tripPageNumber,
    tripNumberOfPages,
    tripPaging,
    isLoading,
    popularDepartureStations,
    popularReturnStations,
  } = useSelector(selectTripInfo);

  const totalRows = tripPaging ? tripPaging.total : 0;

  const changePage = ({ selected }) => {
    dispatch(setPageNumber(selected));
  };
  return (
    <div>
      {' '}
      <Link to='/dashboard/trips/addtrip'>
        <button className='btn btn-success'>Add new trip</button>
      </Link>
      <div className='table-responsive scrollable'>
        <table className=' table'>
          <thead className='table-head '>
            <tr>
              <th scope='col'></th>
              <th scope='col'>Departure Station name</th>
              <th scope='col'>Departure Station Id</th>
              <th scope='col'>Return Station name</th>
              <th scope='col'>Return Station Id</th>
              <th scope='col'>Distance(km)</th>
              <th scope='col'>Duration(mins)</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {trips &&
              trips.map((trip, index) => {
                return <SingleTrip trip={trip} index={index} key={index} />;
              })}
          </tbody>
        </table>
        <div className='trips-loading'>{isLoading && <Spinner />}</div>
      </div>
      <div className='row mt-5'>
        <div className='col-lg-4'>
          <p className='data-statistics'>
            Total Rows: <b>{totalRows}</b> &nbsp;&nbsp;&nbsp; Page:{' '}
            <b>{totalRows ? tripPageNumber + 1 : null}</b> of{' '}
            <b>{tripNumberOfPages}</b>
          </p>
        </div>
        <div className='col-lg-8'>
          <ReactPaginate
            breakLabel='...'
            previousLabel={'Prev'}
            nextLabel={'Next'}
            pageCount={tripNumberOfPages}
            renderOnZeroPageCount={null}
            onPageChange={changePage}
            containerClassName={'pagination'}
            pageLinkClassName={' page-num '}
            previousLinkClassName={' prev-next '}
            nextLinkClassName={' prev-next '}
            activeLinkClassName={'activePage '}
          />
        </div>
      </div>
      <hr />
      <div className='row mt-5 popular-stations'>
        <div className='col-lg-5 popular-departure-stations'>
          <h4>Top 5 popular departure stations</h4>
          <hr />
          {popularDepartureStations &&
            popularDepartureStations.map((station, index) => {
              return (
                <p key={index}>
                  {index + 1}. {station._id} (<b>{station.count}</b> departure
                  trips)
                </p>
              );
            })}
        </div>

        <div className='col-lg-5 popular-return-stations'>
          <h4>Top 5 popular return stations</h4>
          <hr />
          {popularReturnStations &&
            popularReturnStations.map((station, index) => {
              return (
                <p key={index}>
                  {index + 1}. {station._id} (<b>{station.count}</b> Return
                  trips)
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TripList;
