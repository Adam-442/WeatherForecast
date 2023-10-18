import { Card } from "@mui/joy";
import { detail } from "../../state/detailHelper";

// export function SunriseSetCard() {
//     return (
//     <Card variant="soft" color="neutral" orientation="vertical" sx={{height: '100%'}}>
//         <h2 className="font-bold">Sunrise & Sunset</h2>
//         <div className="flex items-center justify-center">
//             <div className="flex flex-col items-center">
//                 <img className="w-28" src={`../src/assets/weather-icons/sunrise.svg`} alt="sunrise" />
//                 <p>05:47 AM</p>
//                 <p>-10:27</p>
//             </div>
//             <div className="flex flex-col items-center">
//                 <img className="w-28" src={`../src/assets/weather-icons/sunset.svg`} alt="sunset" />
//                 <p>05:50 PM</p>
//                 <p>+02:30</p>
//             </div>
//         </div>
//     </Card>
//     )
// }

export function DoubleDetailCard(props: {details: detail[]}) {
    return (
        <Card variant="soft" color="neutral" orientation="vertical" sx={{height: '100%'}}>
            <h2 className="font-bold">{props.details[0].name + " & " + props.details[1].name}</h2>
            <div className="flex items-center justify-center">
            {props.details.map((detail) => 
                <div className="flex flex-col items-center" key={detail.name}>
                    <img className="w-28" src={`../src/assets/weather-icons/${detail.icon}.svg`} alt={detail.name} />
                    <p>{detail.value}</p>
                </div>
            )}
            </div>
        </Card>
    )
}

export function SmallDetailCard(props: {details: detail}) {
    return (
        <Card variant="soft" color="neutral" orientation="vertical" sx={{height: '100%'}}>
            <h2 className="font-bold">{props.details.name}</h2>
            <div className="flex flex-col items-center">
                <img className="w-28" src={`../src/assets/weather-icons/${props.details.icon}.svg`} alt={props.details.name} />
                <p>{props.details.value}</p>
            </div>
        </Card>
    )
}

export default function DetailsCard() {
    
}