import { Chip, Grid } from "@mui/joy";
import { getConditionData } from "../../state/conditionHelper";
import { useAppSelector } from "../../state/hooks";
import { Condition } from "../Condition";
import Strip from "../Strip";

export function CurrentCondition() {
    const weatherRedux = useAppSelector((state) => state.weather.json);
    const selectedDegree = useAppSelector((state) => state.weather.degree);
    const data = getConditionData(weatherRedux.current, selectedDegree, 6);
    
    return (
        data?
        <div>
            <div className="flex flex-col items-center">
                <Chip variant="soft" color="neutral" size="md" sx={{marginBottom: '0.5rem'}}>Last Updated: {data.title}</Chip>
                <p className={"font-bold text-sm".concat(data.isNight? "text-blue-400": "text-yellow-500")}>{data.condition.description}</p>
                <Condition condition={data.condition}/>
            </div>
            <Grid container columns={2}>
                {data.strip.map(d => <Grid xs={1} key={data.title.concat(d.name)}><Strip detail={d} variant="plain"/></Grid>)}
            </Grid>
        </div> : <></>
    )
}