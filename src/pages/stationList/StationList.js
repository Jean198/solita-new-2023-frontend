import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectStationInfo } from '../../redux/features/station/stationSlice';
import Station from '../../components/station/singleStation/Station';

const StationList = () => {
  const { stations } = useSelector(selectStationInfo);

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
        </div>
      </div>
    </div>
  );
};

export default StationList;
