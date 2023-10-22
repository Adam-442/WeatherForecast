import { Card, } from "@mui/joy";
import Strip from "../Strip";
import { dateType, setLastSelected } from "../../state/weatherSlice";
import { Forecastday, Hour } from "../../state/weatherAPIInterface";
import { getConditionData } from "../../state/conditionHelper";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Condition } from "../Condition";
import { colorSwitcher } from "../../style/colorSwitcher";

function isSame(thisCard: Hour | Forecastday, lastSelected: Hour | Forecastday) {
    if ("date" in thisCard && "date_epoch" in lastSelected)
        return thisCard.date_epoch == lastSelected.date_epoch;
    if ("time" in thisCard && "time_epoch" in lastSelected)
        return thisCard.time_epoch == lastSelected.time_epoch;

    return false;
}

export default function ConditionCard(props: {date: dateType, data: Hour | Forecastday}) {
    const dispatch = useAppDispatch();
    const lastSelected = useAppSelector((state) => state.weather.lastSelected);
    const selectedDegree = useAppSelector((state) => state.weather.degree);
    const data = getConditionData(props.data, selectedDegree);

    return (
        <Card variant="soft" color="neutral" orientation="horizontal" sx={{minWidth: 'max-content', paddingY: '0.4rem', border: '2px solid',
        borderColor: isSame(props.data, lastSelected)? (data?.isNight?  colorSwitcher('primary-400', 'primary-300'): colorSwitcher('warning-400', 'warning-300')) : "transparent"}} onClick={() => dispatch(setLastSelected(props.data))}>
            
            {data? <>
            <div className="">
                <h2 className="font-bold">{data.title}</h2>
                <p className={"font-bold text-sm ".concat(data.isNight? "text-blue-400": "text-yellow-500")}>{data.condition.description}</p>
                <Condition condition={data.condition}/>
            </div>
            
            <div className="flex flex-col justify-center items-start max-sm:hidden">
                {data.strip.map(d => <Strip key={data.title.concat(d.name)} detail={d}/>)}
            </div>
            </>: <></>}

        </Card>
    )
}