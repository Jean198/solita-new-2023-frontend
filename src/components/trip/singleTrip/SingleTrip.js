import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './singleTrip.css';
import useStayOnTheSamePage from '../../../customHook/useStayOnTheSamePage';
import { ShowOnLogin } from '../../protect/hiddenLinks';
import { deleteTrip, getTrips } from '../../../redux/features/trip/tripSlice';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SingleTrip = ({ trip }) => {
  console.log(trip);
  const dispatch = useDispatch();

  //Delete Trip action

  const removeTrip = (id) => {
    console.log('running');
    dispatch(deleteTrip(id));
    dispatch(getTrips());
    setTimeout(() => {
      window.location.reload(true);
    }, 3000);
  };

  //Delete Trip popup
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure to delete this Trip ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeTrip(id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

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
              <FaTrashAlt
                size={20}
                color={'#DF362D'}
                cursor='pointer'
                className='actions'
                onClick={() => confirmDelete(trip._id)}
              />
            </span>
          </td>
        </ShowOnLogin>
      </tr>
    </>
  );
};

export default SingleTrip;
