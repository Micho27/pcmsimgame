import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getRaceMetaData } from '../../services/dbActions';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';

interface RaceSelectProps {
    setRaceRow:any;
};

const RaceSelect = (props:RaceSelectProps) => {
    const { setRaceRow } = props;
    const [selectedRace, setselectedRace] = useState('');
    const [races, setRaces] = useState<Array<GoogleSpreadsheetRow>>([]);

    const findRaceRow = (raceName:String) => races.map((raceRow)=>{
            if(raceRow.get('Race') === raceName)
                return raceRow;
        });

    const handleChange = (event: SelectChangeEvent) => {
        setselectedRace(event.target.value as string);
        setRaceRow(findRaceRow(event.target.value as string).filter((el)=> el !== undefined)[0]);
    };

    const fetchRaces = async () => {
        const raceSheets:Array<GoogleSpreadsheetRow>=(await getRaceMetaData()).slice(0,22);

        setRaces([...raceSheets])
    };
    
    useEffect(() => {
        fetchRaces();
    }, [])

  return (
    <Box sx={{ minWidth: 120, margin:'10px'}}>
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