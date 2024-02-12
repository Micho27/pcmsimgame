import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getRaceMetaData } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';

const RaceSelect = () => {
    const [selectedRace, setselectedRace] = useState('');
    const [races, setRaces] = useState<Array<GoogleSpreadsheetRow>>([]);

    const handleChange = (event: SelectChangeEvent) => {
        setselectedRace(event.target.value as string);
    };

    const fetchRaces = async () => {
        const raceSheets:Array<GoogleSpreadsheetRow>=await getRaceMetaData();

        setRaces([...raceSheets])
    };

    useEffect(() => {
        fetchRaces();
    }, [])

  return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Race</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedRace}
                label="Race"
                onChange={handleChange}
            >
                {races.map((race:GoogleSpreadsheetRow) => {
                    return (
                        <MenuItem value={race.get('Race')}>{race.get('Race')}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    </Box>
  );
};

export default RaceSelect;