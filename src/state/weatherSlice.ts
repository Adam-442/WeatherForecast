import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Forecastday, Hour, weatherAPIinterface } from "./weatherAPIInterface";
import { CityData } from "./GeoDBCitiesInterface";

export type dateType = 'day' | 'hour';
export type degreeType = 'c' | 'f';

function fromLocalStorage(key: string, defaultValue: degreeType | CityData): degreeType | CityData {
    let value = localStorage.getItem(key);
    return value != null ? JSON.parse(value) : defaultValue;
}

export function notExpiredStorage(lon: number, lat: number): weatherAPIinterface | {} {
    let value = localStorage.getItem('weatherJson');
    if (value != null) {
        let json: weatherAPIinterface = JSON.parse(value);
        let difference = (new Date().getTime() / 1000) - json.location.localtime_epoch;
        // To compare the saved data with the current data, we need to check the time difference between the two data and the difference in the coordinates
        if (difference < 3600 && json.location.lat - lat < 1 && json.location.lon - lon < 1) return json;
    }
    return {};
}

const initialState = {
    json: {} as weatherAPIinterface,
    dateView: 'day' as dateType,
    degree: fromLocalStorage('degree' ,'c') as degreeType,
    lastSelected: {} as Hour | Forecastday,
    selectedCity: fromLocalStorage('selectedCity', {name: 'Riyadh', countryCode: 'SA', country: 'Saudi Arabia', latitude: 24.6333, longitude: 46.7167}) as CityData
};

export const weatherSlice = createSlice({
    name: "weather",
    initialState: initialState, 
    reducers: {
        setWeatherJson: (state, action: PayloadAction<weatherAPIinterface>) => {
            state.json = action.payload;
            weatherSlice.caseReducers.setLastSelected(state, {type: 'Forecastday', payload: action.payload.forecast.forecastday[0]});
            localStorage.setItem('weatherJson', JSON.stringify(action.payload));
        },
        setToggle: (state, action: PayloadAction<dateType>) => {
            state.dateView = action.payload;
        },
        setDegree: (state, action: PayloadAction<degreeType>) => {
            state.degree = action.payload;
            localStorage.setItem('degree', JSON.stringify(action.payload));
        },
        setLastSelected: (state, action: PayloadAction<Hour | Forecastday>) => {
            state.lastSelected = action.payload;
        },
        setSelectedCity: (state, action: PayloadAction<CityData>) => {
            state.selectedCity = action.payload;
            localStorage.setItem('selectedCity', JSON.stringify(action.payload));
        }
    }
});

export const { setWeatherJson, setToggle, setDegree, setLastSelected, setSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;