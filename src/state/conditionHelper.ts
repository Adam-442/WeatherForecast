import { ConditionProps } from "../components/Condition";
import icons_codes from "../local-json/animatedIconsCode.json";
import getDetails from "./detailHelper";
import { Current, Forecastday, Hour } from "./weatherAPIInterface";
import { dateType, degreeType } from "./weatherSlice";

export function getDate(fromString: string, toStyle: dateType) {
    if (toStyle === 'day') return new Date(fromString).toLocaleString('en-US', { weekday: 'long' });
    return new Date(fromString).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export function getSVG(link: string, isDay: boolean) {
    let from = link.slice(link.length-7, link.length-4);
    if (from in icons_codes) return icons_codes[from as keyof typeof icons_codes][isDay? 'day' : 'night'];
    return 'not-available';
}

export function getDegree(selected: degreeType, c: number, f: number) {
    if (selected === 'c') return `${c} °C`;
    return `${f} °F`;
}

export function get24Hours(days: Forecastday[]) {
    const thisHour = new Date().getHours();
    return days[0].hour.slice(thisHour).concat(days[1].hour.slice(0, thisHour));
}

export function getConditionData(data: Hour | Forecastday | Current, selectedDegree: degreeType, stripesAmount = 4) {
    if (data === undefined) {
        return
    }

    if ('date' in data) {
        return {
            title: getDate(data.date, 'day'),
            condition: {
                svg: getSVG(data.day.condition.icon, true),
                degrees: [getDegree(selectedDegree, data.day.maxtemp_c, data.day.maxtemp_f), getDegree(selectedDegree, data.day.mintemp_c, data.day.mintemp_f)] as [string, string],
                description: data.day.condition.text,
                tips: ['Highest Temperature', 'Lowest Temperature'] as [string, string]
            } as ConditionProps,
            strip: getDetails(data, stripesAmount),
            isNight: false
        }
    }

    return {
        title: ('last_updated' in data)? getDate(data.last_updated, 'hour'):getDate(data.time, 'hour'),
        condition: {
            svg: getSVG(data.condition.icon, data.is_day? true : false),
            degrees: [getDegree(selectedDegree, data.temp_c, data.temp_f), getDegree(selectedDegree, data.feelslike_c, data.feelslike_f)] as [string, string],
            description: data.condition.text,
            tips: ['Temperature', 'Feels Like'] as [string, string]
        } as ConditionProps,
        strip: getDetails(data, stripesAmount),
        isNight: !data.is_day
    }
}