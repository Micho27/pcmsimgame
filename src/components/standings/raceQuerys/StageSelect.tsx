import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface StageSelectProps {
    numStages:number;
    setStage:any;
}

const StageSelect = (props:StageSelectProps) => {
    const { numStages, setStage } = props;
    const [selectedStage, setselectedStage] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setselectedStage(event.target.value as string);
        setStage(+event.target.value);
    };

    useEffect(()=>{
        setselectedStage('');
    },[numStages]);

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
                        Array.from('x'.repeat(numStages)).map((e,i)=> {
                            return (
                                <MenuItem value={i+1}>{'Stage '+ (i+1)}</MenuItem>
                            )
                        })
                    }
                    {
                        numStages > 1 ? <MenuItem value={69}>{'Final Standings'}</MenuItem> : <></>
                    }
                </Select>
            </FormControl>
        </Box>
  );
};

export default StageSelect;