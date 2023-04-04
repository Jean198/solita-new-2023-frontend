import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Home from './pages/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { setLogin } from './redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import Main from './components/main/Main';
import AddTrip from './pages/addTrip/AddTrip';
import StationList from './pages/stationList/StationList';
import TripList from './pages/tripList/TripList';
import AddStation from './pages/addStation/AddStation';
import StationDetails from './components/station/stationDetails/StationDetails';
import EditStation from './pages/editStation/EditStation';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function logiStatus() {
      const status = await getLoginStatus();
      await dispatch(setLogin(status));
    }
    logiStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            <Dashboard>
              <Main />
            </Dashboard>
          }
        />

        <Route
          path='/dashboard/stations'
          element={
            <Dashboard>
              <Main>
                <StationList />
              </Main>
            </Dashboard>
          }
        />

        <Route
          path='/dashboard/stations/station/:id'
          element={
            <Dashboard>
              <Main>
                <StationDetails />
              </Main>
            </Dashboard>
          }
        />

        <Route
          path='/dashboard/stations/addstation'
          element={
            <Dashboard>
              <Main>
                <AddStation />
              </Main>
            </Dashboard>
          }
        />
        <Route
          path='/dashboard/stations/editstation/:id'
          element={
            <Dashboard>
              <Main>
                <EditStation />
              </Main>
            </Dashboard>
          }
        />

        <Route
          path='/dashboard/trips/'
          element={
            <Dashboard>
              <Main>
                <TripList />
              </Main>
            </Dashboard>
          }
        />
        <Route
          path='/dashboard/trips/addtrip'
          element={
            <Dashboard>
              <Main>
                <AddTrip />
              </Main>
            </Dashboard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
