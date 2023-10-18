import { Grid } from "@mui/joy";
import { useAppSelector } from "../../state/hooks";
import { DoubleDetailCard, SmallDetailCard } from "./DetailsCard";
import { getAllDetailsGrouped } from "../../state/detailHelper";

export default function BottomSection() {
    const lastSelected = useAppSelector((state) => state.weather.lastSelected);
    const data = getAllDetailsGrouped(lastSelected);

    return (
        data?
        <Grid container columns={{xs: 6, sm: 9, md: 9, lg: 12}} spacing={1} marginX={'0.5rem'}>
                {data.map((detailsArray) => 
                    detailsArray.length === 2?
                    <Grid xs={3} key={detailsArray[0].name.concat(detailsArray[1].name)}><DoubleDetailCard details={detailsArray}/></Grid>
                    : <Grid xs={3} key={detailsArray[0].name}><SmallDetailCard details={detailsArray[0]}/></Grid>
                )}
        </Grid> : <p>Loading...</p>
    )
}