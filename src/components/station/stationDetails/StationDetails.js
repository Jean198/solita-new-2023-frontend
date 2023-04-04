import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './stationDetails.css';
import axios from 'axios';
import Spinner from '../../../components/spinner/Spinner';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from '../../../assets/leaflet/leaflet';
import 'leaflet/dist/leaflet.css';
import { defaultIcon } from '../../../icons/defaultIcon';
import { useSelector } from 'react-redux';
import { selectStationInfo } from '../../../redux/features/station/stationSlice';

const URL = process.env.REACT_APP_BACKEND_URL;

//The single station View
const StationDetails = () => {
  const { stations } = useSelector(selectStationInfo);
  const [singleStationData, setsingleStationData] = useState([]);
  const [loading, setLoading] = useState(false);

  const ZOOM_LEVEL = 15;

  let { id } = useParams();

  const countStationsOccurences = async (id) => {
    setLoading(true);
    try {
      await axios
        .get(`${URL}/api/stations/getstation/${id}`)
        .then((response) => {
          //Fetching the sing station info
          console.log(response.data);
          setsingleStationData(response.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    countStationsOccurences(id);
  }, [id]);

  return (
    <div className='station-details-container'>
      {stations &&
        stations
          .filter((station) => station.id === id)
          .map((station, index) => {
            return (
              <div key={index}>
                <div className='text-center mb-3 station-big-title'>
                  <h1>{station.name}</h1>
                  <b>Street name:</b>{' '}
                  <span className='address'>{station.address}</span>
                </div>
                <div className='row mb-5'>
                  <MapContainer
                    center={[station.y, station.x]}
                    zoom={ZOOM_LEVEL}
                  >
                    <TileLayer
                      url={leaflet.maptiler.url}
                      attribution={leaflet.maptiler.attribution}
                    />
                    <Marker
                      position={[station.y, station.x]}
                      icon={defaultIcon}
                    >
                      <Popup>
                        <b>{station.address}</b>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className='row station-box'>
                  <ul>
                    <li>
                      <ul className='mt-3'>
                        <li>
                          Number of trips starting from this Station:{' '}
                          <b>{singleStationData.departureCounts}</b>
                        </li>
                        <li>
                          Number of trips Ending at this Station:{' '}
                          <b>{singleStationData.returnCounts}</b>
                        </li>
                        <li>
                          Average distance of trips starting from this station:{' '}
                          <b>
                            {singleStationData.averageDepartureDistance &&
                              singleStationData.averageDepartureDistance.toFixed(
                                2
                              )}
                          </b>{' '}
                          meters
                        </li>
                        <li>
                          Average distance of trips ending at this station:{' '}
                          <b>
                            {singleStationData.averageReturnDistance &&
                              singleStationData.averageReturnDistance.toFixed(
                                2
                              )}
                          </b>{' '}
                          meters
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <hr />
                <div className='row mt-5 '>
                  <div className='popular-station-title'>
                    <h3 className='mb-5'>Popular stations</h3>
                  </div>
                  <div className='col-lg-6'>
                    <div className='mb-5'>
                      <b>Popular departure stations for trips ending at </b>
                      <span className='address'>{station.name}</span>
                    </div>

                    {loading ? <Spinner /> : null}

                    {singleStationData.popularDepartureStations &&
                      singleStationData.popularDepartureStations.map(
                        (station, index) => {
                          return (
                            <div key={index} className=''>
                              <p>
                                <b>{index + 1}</b>. {station._id}(Departures:{' '}
                                {station.count})
                              </p>
                              <p></p>
                              <hr />
                            </div>
                          );
                        }
                      )}
                  </div>

                  <div className='col-lg-6'>
                    <div className='mb-5'>
                      <b>Popular return stations for trips starting at </b>
                      <span className='address'>{station.name}</span>
                    </div>

                    {loading ? <Spinner /> : null}

                    {singleStationData.popularReturnStations &&
                      singleStationData.popularReturnStations.map(
                        (station, index) => {
                          return (
                            <div key={index}>
                              <p>
                                <b>{index + 1}</b>. {station._id}(Returns:{' '}
                                {station.count})
                              </p>
                              <p></p>
                              <hr />
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default StationDetails;
