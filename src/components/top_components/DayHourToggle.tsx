import { Button, ToggleButtonGroup } from "@mui/joy";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { setToggle } from "../../state/weatherSlice";

export default function DHToggle() {
    const toggleRedux = useAppSelector((state) => state.weather.dateView);
    const dispatch = useAppDispatch();
    return (
        <ToggleButtonGroup size="md" spacing={0} variant="outlined" color="primary" value={toggleRedux} onChange={
            (_, n) => {if (typeof n === 'string') dispatch(setToggle(n));}}>
            <Button value="day" sx={{borderTopLeftRadius: 999, borderBottomLeftRadius: 999}}>Day</Button>
            <Button value="hour" sx={{borderTopRightRadius: 999, borderBottomRightRadius: 999}}>Hour</Button>
        </ToggleButtonGroup>
    )
}