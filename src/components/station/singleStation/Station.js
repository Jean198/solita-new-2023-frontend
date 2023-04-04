import './station.css';
import React from 'react';
import './station.css';
import { AiOutlineEye } from 'react-icons/ai';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useStayOnTheSamePage from '../../../customHook/useStayOnTheSamePage';
import { ShowOnLogin } from '../../protect/hiddenLinks';
import {
  deleteStation,
  getStations,
} from '../../../redux/features/station/stationSlice';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

//The station component which is the row in the station's list table
const Station = ({ station, index }) => {
  const navigate = useNavigate();

  /*
  const handleRowClick = (id) => {
    navigate(`station/${station.id}`);
  };

  */
  const dispatch = useDispatch();

  //Delete station action

  const removeStation = (id) => {
    console.log('running');
    dispatch(deleteStation(id));
    dispatch(getStations());
    setTimeout(() => {
      window.location.reload(true);
    }, 3000);
  };

  //Delete station popup
  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure to delete this station ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeStation(id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <>
      <tr className='station-row' key={index}>
        <td></td>
        <td>{station.id}</td>
        <td>{station.name}</td>
        <ShowOnLogin>
          <td>
            <span>
              <Link to={`station/${station.id}`}>
                <AiOutlineEye size={25} color={'#104110'} className='actions' />
              </Link>
            </span>
            <span>
              <Link
                to={useStayOnTheSamePage(`station/editstation/${station.id}`)}
              >
                <FaEdit size={20} color={'#FD7F20'} className='actions' />
              </Link>
            </span>
            <span>
              <FaTrashAlt
                size={20}
                color={'#DF362D'}
                cursor='pointer'
                className='actions'
                onClick={() => confirmDelete(station._id)}
              />
            </span>
          </td>
        </ShowOnLogin>
      </tr>
    </>
  );
};

export default Station;
