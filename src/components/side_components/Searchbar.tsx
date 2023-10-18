import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import React from 'react';
import { CitiesInterface, CityData } from '../../state/GeoDBCitiesInterface';
import { useDebounce } from '@uidotdev/usehooks';
import { useAppDispatch } from '../../state/hooks';
import { setSelectedCity } from '../../state/weatherSlice';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export default function CitySearchBar() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const [open, setOpen] = React.useState(false);
  const [results, setResults] = React.useState<CityData[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const searchAPI = async () => {
      setIsSearching(true);
      if (debouncedSearchTerm) {       
        console.log('searching for: ' + debouncedSearchTerm);
        const data = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${debouncedSearchTerm}&languageCode=en&asciiMode=true`, {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'ad3fdebc7cmsh95d71220e06932cp1c2ad5jsn002eb93df3fa',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
          }
        });
        const json: CitiesInterface = await data.json();
        setResults([...json.data]);
      }

      setIsSearching(false);
    };

    searchAPI();
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    if (!open) {
      setResults([]);
    }
  }, [open]);

  return (
    <FormControl>
      <FormLabel>Location</FormLabel>
      <Autocomplete
        sx={{width: 250}}
        forcePopupIcon={false}
        placeholder="Search for a city..."
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name && option.countryCode === value.countryCode}
        getOptionLabel={(option) => `${option.name}, ${option.countryCode}`}
        options={results}
        loading={isSearching}
        onInputChange={(_, v) => {setSearchTerm(v)}}
        onChange={(_, v) => {v? dispatch(setSelectedCity(v)): null}}
        endDecorator={
          isSearching ? (
            <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
          ) : <TravelExploreIcon />
        }
      />
    </FormControl>
  );
}