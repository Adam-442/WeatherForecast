import { Chip, Tooltip, VariantProp } from "@mui/joy";
import { detail } from "../state/detailHelper";

function SmallIcon(props: {detail: detail}) {
    return (
        <img 
        className="w-12"
        src={`../src/assets/weather-icons/${props.detail.icon}.svg`}
        alt={props.detail.name}/>
    )
}

export default function Strip(props: {detail: detail, variant?: VariantProp}) {
    return (
        <Tooltip title={props.detail.name} placement="left" size="sm" variant="plain">
            <Chip sx={{margin: 0, padding: 0}} variant={props.variant? props.variant: 'soft'} color="neutral" size="md" startDecorator={<SmallIcon detail={props.detail} />}>
                <p className="pr-2">{props.detail.value}</p>
            </Chip>
        </Tooltip>
    )
}