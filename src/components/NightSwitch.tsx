import Switch from '@mui/joy/Switch';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import React from 'react';
import { useColorScheme } from '@mui/joy/styles';

export default function NightSwitch() {
    const { mode, setMode } = useColorScheme();

    return (
        <Switch
            size="lg"
            color={mode === 'light' ? 'primary' : 'warning'}
            slotProps={{
                input: { 'aria-label': 'Dark mode' },
                thumb: { children: mode === 'dark'? <DarkMode /> : <LightMode />}
            }}
            sx={{'--Switch-thumbSize': '25px'}}
            checked={mode === 'dark'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMode(event.target.checked? 'dark' : 'light')}
        />
    );
}