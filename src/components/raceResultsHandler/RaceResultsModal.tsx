import { Modal, Button, Divider } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type cvsItem = {
    id: string;
    value: string;
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const RaceResultsModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [csvData, setCsvData] = useState<cvsItem[]>([]);
    const [filename, setFilename] = useState("");
    const [level, setLevel] = useState("");
    const [raceType, setRaceType] = useState("");

    //this function needs to be edited to send data to database.
    //in future maybe push this to backend but for now this will be fine
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const { name } = file;
        setFilename(name);

        const reader = new FileReader();
        reader.onload = (evt) => {
            if (!evt?.target?.result) {
                return;
            }
            const { result } = evt.target;
            // const records = parse(result as string, {
            //     columns: ["id", "value"],
            //     delimiter: ";",
            //     trim: true,
            //     skip_empty_lines: true
            // });
            setCsvData([]);
        };
        reader.readAsBinaryString(file);
    };

    const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevel((event.target as HTMLInputElement).value);
    };
    const handleRaceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRaceType((event.target as HTMLInputElement).value);
    };

    return (
        <div>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={handleOpen}>Upload Race Results</Button>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{ zIndex: 100 }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <FormControl>
                        <FormLabel id="raceLevelForm">Race Level</FormLabel>
                        <RadioGroup
                            defaultValue="wt"
                            name="radio-buttons-group"
                            onChange={handleLevelChange}
                        >
                            <FormControlLabel value="wt" control={<Radio />} label="World Tour" />
                            <FormControlLabel value="pt" control={<Radio />} label="Pro Tour" />
                            <FormControlLabel value="ct" control={<Radio />} label="Continental" />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <FormControl>
                        <FormLabel id="raceLevelForm">Race Type</FormLabel>
                        {level === 'wt' ?
                            (<RadioGroup>
                                <FormControlLabel value="gvs" control={<Radio />} label="Giro/vuelta stage" />
                                <FormControlLabel value="gvgc" control={<Radio />} label="Giro/Vuelta GC" />
                                <FormControlLabel value="tdfs" control={<Radio />} label="Tour de France Stage" />
                                <FormControlLabel value="tdfgc" control={<Radio />} label="Tour de France GC" />
                                <FormControlLabel value="ows" control={<Radio />} label="One Week stage" />
                                <FormControlLabel value="owgc" control={<Radio />} label="One week gc" />
                                <FormControlLabel value="mon" control={<Radio />} label="Monument" />
                                <FormControlLabel value="odr" control={<Radio />} label="one day" />
                            </RadioGroup>) :
                            level === 'pt' ?
                                (<RadioGroup>
                                    <FormControlLabel value="pts" control={<Radio />} label="pro tour stage" />
                                    <FormControlLabel value="ptgc" control={<Radio />} label="pro tour gc" />
                                    <FormControlLabel value="ptodr" control={<Radio />} label="pro tour one day" />
                                </RadioGroup>) :
                                level === 'ct' ?
                                    (<RadioGroup>
                                        <FormControlLabel value="cs" control={<Radio />} label="conti stage" />
                                        <FormControlLabel value="cgc" control={<Radio />} label="conti gc" />
                                        <FormControlLabel value="codr" control={<Radio />} label="conti one day" />
                                    </RadioGroup>) : null
                        }
                    </FormControl>
                    <Divider />
                    <Button sx={{ marginTop: 5 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Choose Excel File
                        <VisuallyHiddenInput type="file" accept=".xlsm" onChange={handleFileUpload} />
                    </Button>
                </Box>
            </Modal>
        </div >
    );
};

export default RaceResultsModal;