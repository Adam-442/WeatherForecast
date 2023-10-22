import { Button, ToggleButtonGroup } from "@mui/joy";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { setDegree } from "../../state/weatherSlice";

// import { SxProps } from "@mui/joy/styles/types";
// const buttonStyle:SxProps = { borderRadius: 999, aspectRatio: 1};

export default function DHToggle() {
    const degreeRedux = useAppSelector((state) => state.weather.degree);
    const dispatch = useAppDispatch();
    return (
        <ToggleButtonGroup size="md" spacing={0} variant="outlined" color="primary" value={degreeRedux} onChange={
            (_, n) => {if (typeof n === 'string') dispatch(setDegree(n));}}>
            <Button value="c" sx={{borderTopLeftRadius: 999, borderBottomLeftRadius: 999}}>°C</Button>
            <Button value="f" sx={{borderTopRightRadius: 999, borderBottomRightRadius: 999}}>°F</Button>
        </ToggleButtonGroup>
    )
}