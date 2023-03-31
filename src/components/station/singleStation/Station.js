import './station.css';
import React from 'react';
import './station.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useStayOnTheSamePage from '../../../customHook/useStayOnTheSamePage';

//The station component which is the row in the station's list table
const Station = ({ station, index }) => {
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`station/${station.id}`);
  };

  return (
    <>
      <tr className='station-row' key={index}>
        <td></td>
        <td>{station.id}</td>
        <td>{station.name}</td>
        <td>
          <span>
            <Link to={useStayOnTheSamePage(`station/${station.id}`)}>
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
      </tr>
    </>
  );
};

export default Station;
