import { Card } from "@mui/joy";
import { useAppSelector } from "../../state/hooks";

export default function CurrentLocation() {
    const selectedCity = useAppSelector(state => state.weather.selectedCity);

    return (
        <div>
            <h2 className="text-sm font-semibold mb-1">Current Location</h2>
            <Card sx={{background: 'url(../src/assets/skyscrapers.jpeg)', backgroundSize: 'cover', padding: 0, overflow: 'hidden'}}>
                <p className="flex justify-center text-md text-white drop-shadow-2xl font-semibold w-full h-full p-4 bg-black bg-opacity-40 hover:bg-opacity-50 transition-all cursor-pointer">{selectedCity.name}, {selectedCity.countryCode}</p>
            </Card>
        </div>
    )
}