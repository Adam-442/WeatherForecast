import { get24Hours } from "../../state/conditionHelper";
import { useAppSelector } from "../../state/hooks";
import ConditionCard from "./ConditionCard";
import DHToggle from "./DayHourToggle";
import FCToggle from "./FCToggle";
import { Chip, Divider } from "@mui/joy";
import {Fragment} from "react";

export default function TopSection() {
  const weatherRedux = useAppSelector((state) => state.weather.json);
  const selectedDate = useAppSelector((state) => state.weather.dateView);
  const thisHour = new Date().getHours();

  return (
    <div className="m-2">
        <div className="flex justify-between mb-2">
            <DHToggle />
            <FCToggle />
        </div>
        <div className='flex flex-row overflow-y-auto scroll no-scrollbar gap-2'>
        {weatherRedux.forecast?
                selectedDate === 'day'?
                    weatherRedux.forecast.forecastday.map(fday => <ConditionCard key={fday.date} date= 'day' data= {fday} />)
                : 
                    get24Hours(weatherRedux.forecast.forecastday).map((fhour, index) => { return (
                        <Fragment key={fhour.time}>
                            <ConditionCard key={'ConditionCard@'.concat(fhour.time)} date="hour" data={fhour} />
                            {/* Add Divider When tomorrow hours are being shown */}
                            {23-thisHour===index? <Divider key={'MidnightDivider@'.concat(fhour.time)} orientation="vertical">
                                <Chip variant="soft" color="neutral" size="sm">Midnight</Chip>
                            </Divider>: null} 
                        </Fragment>
                        )}
                    )
            : <p>Loading...</p>
        }
        </div>
    </div>
    )
}