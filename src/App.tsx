import { useEffect } from 'react'
import './style/App.css'
import { useAppDispatch, useAppSelector } from './state/hooks';
import { notExpiredStorage, setWeatherJson } from './state/weatherSlice';
import TopSection from './components/top_components/TopSection';
import { Divider, Grid } from '@mui/joy';
import Sidebar from './components/side_components/Sidebar';
import BottomSection from './components/bottom_components/BottomSection';
import { weatherAPIinterface } from './state/weatherAPIInterface';

function App() {  
  const dispatch = useAppDispatch()
  const selectedCity = useAppSelector(state => state.weather.selectedCity);

  useEffect(() => {
    const api = async () => {
      let json: weatherAPIinterface;
      
      const storedJson = notExpiredStorage(selectedCity.longitude, selectedCity.latitude);
      if ('current' in storedJson) {
        console.log('fetching data from local storage...');
        json = storedJson;
      } else {
        console.log('fetching data from weatherapi.com for: ' + selectedCity.name + ' ' + selectedCity.country + '...');
        const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c1e117af4a314da5807214638233009&q=${selectedCity.name} ${selectedCity.country}&days=3&aqi=no&alerts=no`, {
          method: 'GET',
        });
        json = await data.json();
      }

      dispatch(setWeatherJson(json));
    }

    api()
  }, [selectedCity]);

  return (
    // <div className='h-screen grid items-center justify-center overflow-hidden grid-flow-dense'>
    <Grid container>
        <Grid xs={12} sm={12} md={3.5} lg={2.5}><Sidebar /></Grid>
        <Grid xs={12} sm={12} md={8.5} lg={9.5}>
          <TopSection />
          <Divider sx={{'--Divider-childPosition': '1%', marginY: '0.5rem'}}><p className='font-bold'>More Details</p></Divider>
          <BottomSection />
        </Grid>
    </Grid>
  )
}

export default App
