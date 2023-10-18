import { Current, Forecastday, Hour } from "./weatherAPIInterface";

export type detailType = 'wind' | 'humidity' | 'pressure' | 'visibility' | 'uv-index' | 'sunrise' | 'sunset' | 'rain' | 'snow' | 'precepation' | 'moon-phase' | 'wind-dir';
export type moonPhaseType = 'New Moon' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full Moon' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';
export interface detail {name: string, icon: string, value: string};

const units = {
    'wind': ' km/h',
    'humidity': '%',
    'pressure': ' hPa',
    'visibility': ' km',
    'uv-index': '',
    'sunrise': '',
    'sunset': '',
    'rain': '%',
    'snow': '%',
    'precepation': ' mm',
    'moon-phase': '',
    'wind-dir': ''
}

const icons = {
    'wind': 'wind',
    'humidity': 'humidity',
    'pressure': 'not-available',
    'visibility': 'mist',
    'uv-index': 'uv-index',
    'sunrise': 'sunrise',
    'sunset': 'sunset',
    'rain': 'raindrops',
    'snow': 'snowflake',
    'precepation': 'raindrop-measure',
    'moon-phase': 'moon-full',
    'wind-dir': 'not-available'
}

const moonPhases = {
    'New Moon': 'moon-new',
    'Waxing Crescent': 'moon-waxing-crescent',
    'First Quarter': 'moon-first-quarter',
    'Waxing Gibbous': 'moon-waxing-gibbous',
    'Full Moon': 'moon-full',
    'Waning Gibbous': 'moon-waning-gibbous',
    'Last Quarter': 'moon-last-quarter',
    'Waning Crescent': 'moon-waning-crescent',
}

function moonIcon(value: string) {
    if (value in moonPhases) return moonPhases[value as moonPhaseType];
    return moonPhases["Full Moon"];
}

function pressureIcon(value: number) {
    return value > 1000 ? 'pressure-high' : 'pressure-low';
}

function uvIcon(value: number) {
    return value < 12 ? `uv-index-${value}` : 'uv-index-12';
}

function uvValue(value: number) {
    if (value < 3) return 'Low';
    if (value < 6) return 'Moderate';
    if (value < 8) return 'High';
    if (value < 11) return 'Very High';
    return 'Extreme';
}

// function windDirValue(value: string) {
//     return 
// }

function getName(type: detailType) {
    if (type === 'uv-index') return 'UV Index';
    if (type === 'moon-phase') return 'Moon Phase'
    return type[0].toUpperCase() + type.slice(1);
}

function getIcon(type: detailType, value: number | string) {
    if (typeof value != 'string') {
        if (type === 'pressure') return pressureIcon(value);
        if (type === 'uv-index') return uvIcon(value);
    } else {
        if (type === 'moon-phase') return moonIcon(value);
    }
    return icons[type];
}

function getValue(type: detailType, value: number) {
    if (type === 'uv-index') return uvValue(value);
    return value.toString().concat(units[type]);
}

export function getDetail(type: detailType, value: number | string): detail {
    return {
        name: getName(type),
        icon: getIcon(type, value),
        value: (typeof value === 'string')? value : getValue(type, value)
    }
}

export default function getDetails(data: Hour | Forecastday | Current, amount = 4): detail[] {
    if ('date' in data) {
        return [
            getDetail('sunrise', data.astro.sunrise),
            getDetail('sunset', data.astro.sunset),
            getDetail('visibility', data.day.avgvis_km),
            getDetail('moon-phase', data.astro.moon_phase),
        ]
    }
    
    return [
        getDetail('wind', data.wind_kph),
        getDetail('visibility', data.vis_km),
        getDetail('pressure', data.pressure_mb),
        getDetail('uv-index', data.uv),
        getDetail('humidity', data.humidity),
        getDetail('precepation', data.precip_mm),
    ].splice(0, amount);
}

// To use for the bottom section
export function getAllDetailsGrouped(data: Hour | Forecastday): detail[][] | undefined {
    if ('date' in data) {
        return [
            [getDetail('sunrise', data.astro.sunrise), getDetail('sunset', data.astro.sunset)],
            [getDetail('rain', data.day.daily_chance_of_rain), getDetail('precepation', data.day.totalprecip_mm)],
            [getDetail('humidity', data.day.avghumidity)],
            [getDetail('moon-phase', data.astro.moon_phase)],
            [getDetail('visibility', data.day.avgvis_km)],
            [getDetail('uv-index', data.day.uv)],
        ]
    }

    if ('uv' in data) {
        return [
            [getDetail('rain', data.chance_of_rain), getDetail('precepation', data.precip_mm)],
            [getDetail('humidity', data.humidity)],
            [getDetail('wind', getValue('wind', data.wind_kph).concat(" " + data.wind_dir))],
            [getDetail('visibility', data.vis_km)],
            [getDetail('uv-index', data.uv)],
            [getDetail('pressure', data.pressure_mb)],
        ]
    }
}