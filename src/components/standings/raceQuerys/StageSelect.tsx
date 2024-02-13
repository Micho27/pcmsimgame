import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getRaceMetaData } from '../../../services/dbActions';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';

interface StageSelectProps {
    numStages:number;
}

const StageSelect = (props:StageSelectProps) => {
    const { numStages } = props;
    const [selectedStage, setselectedStage] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setselectedStage(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120, margin:'10px' }}>
            <FormControl fullWidth>
                <InputLabel id="stageSelect">Stage</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedStage}
                    label="Race"
                    onChange={handleChange}
                >
                    {
                        [...Array(numStages)].map((e,i)=> {
                            return (
                                <MenuItem value={i+1}>{'Stage '+ (i+1)}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </Box>
  );
};

export default StageSelect;