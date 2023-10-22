import { useColorScheme } from "@mui/joy";

function varWrap(color: string) {
    return `var(--joy-palette-${color})`;
}

export function colorSwitcher(darkColor: string, lightColor: string) {
    const {mode} = useColorScheme();
    return mode === 'dark' ? varWrap(darkColor) : varWrap(lightColor);
}