import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectStationInfo,
  setPageNumber,
} from '../../redux/features/station/stationSlice';
import Station from '../../components/station/singleStation/Station';
import ReactPaginate from 'react-paginate';
import './stationList.css';
//----------------------------------------

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from '../../assets/leaflet/leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultIcon } from '../../icons/defaultIcon';
import { ShowOnLogin } from '../../components/protect/hiddenLinks';
//---------------------------------------

const StationList = () => {
  const ZOOM_LEVEL = 11;
  const mapRef = useRef();

  const dispatch = useDispatch();
  const { stations, pageNumber, numberOfPages, paging, allStations } =
    useSelector(selectStationInfo);
  const totalRows = paging ? paging.total : 0;

  const changePage = ({ selected }) => {
    dispatch(setPageNumber(selected));
  };

  return (
    <div className=' mt-5 averall-container'>
      <ShowOnLogin>
        <Link to='/dashboard/stations/addstation'>
          <button className='btn btn-success'>Add new station</button>
        </Link>
      </ShowOnLogin>

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
                  <ShowOnLogin>
                    <th scope='col'>Action</th>
                  </ShowOnLogin>
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
                  breakLabel='...'
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  pageCount={numberOfPages}
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
          </div>
        </div>

        <div className='leaflet-container col-lg-6'>
          <MapContainer
            className='map-container'
            center={[60.21258729, 24.96985712]}
            zoom={ZOOM_LEVEL}
            ref={mapRef}
          >
            <TileLayer
              url={leaflet.maptiler.url}
              attribution={leaflet.maptiler.attribution}
            />

            {allStations &&
              // eslint-disable-next-line array-callback-return
              allStations.map((station, index) => {
                if (station.x && station.y) {
                  return (
                    <Marker
                      position={[station.y, station.x]}
                      icon={defaultIcon}
                      key={index}
                    >
                      <Popup>
                        <b>
                          {station.name} <br />
                          {station.address}{' '}
                        </b>
                      </Popup>
                    </Marker>
                  );
                }
              })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default StationList;
