import { Tooltip } from "@mui/joy";

export type ConditionProps = {svg: string, degrees: [string, string], description: string, tips: [string, string]}

export function Condition(props: {condition: ConditionProps}) {    
    return (
        <>
        <img 
        className="w-28"
        src={`../src/assets/weather-icons/${props.condition.svg}.svg`}
        alt={props.condition.svg} />
        <div className="flex items-end gap-2">
            <Tooltip title={props.condition.tips[0]} size="sm" variant="plain" arrow={true}>
                <h1 className="font-bold text-xl">{props.condition.degrees[0]}</h1>
            </Tooltip>
            <Tooltip title={props.condition.tips[1]}  size="sm" variant="plain" arrow>
                <h1 className="font-bold text-gray-400">{props.condition.degrees[1]}</h1>
            </Tooltip>
        </div>
        </>
    )
}