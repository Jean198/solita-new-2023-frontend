import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './singleTrip.css';
import useStayOnTheSamePage from '../../../customHook/useStayOnTheSamePage';
import { ShowOnLogin } from '../../protect/hiddenLinks';

const SingleTrip = ({ trip }) => {
  return (
    <>
      <tr className='trip-row'>
        <td></td>
        <td>{trip.departure_station_name} </td>
        <td>{trip.departure_station_id}</td>
        <td>{trip.return_station_name}</td>
        <td>{trip.return_station_id}</td>
        <td>{(trip.covered_distance_m / 1000).toFixed(2)}</td>
        <td>{(trip.return_station_id / 60).toFixed(1)}</td>
        <ShowOnLogin>
          <td>
            <span>
              <Link to={useStayOnTheSamePage(`trip/edittrip/${trip.id}`)}>
                <FaEdit size={20} color={'#FD7F20'} className='actions' />
              </Link>
            </span>
            <span>
              <Link to={useStayOnTheSamePage(`trip/deletetrip/${trip.id}`)}>
                <FaTrashAlt
                  size={20}
                  color={'#DF362D'}
                  cursor='pointer'
                  className='actions'
                />
              </Link>
            </span>
          </td>
        </ShowOnLogin>
      </tr>
    </>
  );
};

export default SingleTrip;
