import './station.css';
import React from 'react';
import './station.css';
import { AiOutlineEye } from 'react-icons/ai';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useStayOnTheSamePage from '../../../customHook/useStayOnTheSamePage';
import { ShowOnLogin } from '../../protect/hiddenLinks';

//The station component which is the row in the station's list table
const Station = ({ station, index }) => {
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`station/${station.id}`);
  };

  return (
    <>
      <tr
        className='station-row'
        key={index}
        onClick={() => {
          handleRowClick(station.id);
        }}
      >
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
              <Link
                to={useStayOnTheSamePage(`station/deletestation/${station.id}`)}
              >
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

export default Station;
