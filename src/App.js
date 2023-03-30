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
import Sidebar from './components/sidebar/Sidebar';
import StationList from './components/station/stationList/StationList';

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
          path='/stations'
          element={
            <Dashboard>
              <Main>
                <StationList />
              </Main>
            </Dashboard>
          }
        />
        <Route
          path='/trips/addtrip'
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
