import { Modal, Button, Divider } from "@mui/material";
import { ChangeEvent, useState, useEffect } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getUCIStandings } from '../../services/dbActions';
import * as XLSX from "xlsx";
import { uciStandings } from '../../commonTypes';

type RaceResults = {
    id: string;
    Rank: number;
    Team: String;
    Name: String;
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

const readExcel = async (file: any, setRaceResults: Function) => {
    const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e: any) => {
            const bufferArray = e.target.result;

            const wb = XLSX.read(bufferArray, { type: "buffer" });

            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);
            resolve(data);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });

    promise.then((d: any) => {
        setRaceResults(d);
    });
}

const getTeam = (teamName: string, uciStandingsData: Array<uciStandings>) => {
    let scoringTeam: uciStandings | undefined;
    let index = -1;

    uciStandingsData.forEach((team: uciStandings, idx) => {
        if (team.teams === teamName) {
            scoringTeam = team;
            index = idx;
        }
    });

    return { scoringTeam, index };
};

const RaceResultsModal = () => {
    const [open, setOpen] = useState(false);
    const [raceResults, setRaceResults] = useState<RaceResults[]>([]);
    const [level, setLevel] = useState("");
    const [raceType, setRaceType] = useState("");
    const [uciStandingsData, setuciStandingsData] = useState<Array<uciStandings>>([]);

    const toggleOpenClose = () => setOpen(!open);

    //function fetches uci data from database
    const fetchTeamStandings = async () => {

        const res: Array<uciStandings> = await getUCIStandings()

        setuciStandingsData([...res])
    };

    useEffect(() => {
        fetchTeamStandings()
    }, [])

    //this function needs to be edited to send data to database.
    //in future maybe push this to backend but for now this will be fine
    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        const file = e.target.files[0];
        const data = readExcel(file, setRaceResults);
        debugger;
        console.log(data);
        console.log(raceResults);

        const TeamStandings =
            raceResults.forEach((result: RaceResults) => {
                if (result.Rank < 15) {
                    //add points calculations
                    const { scoringTeam, index } = getTeam("Efapel Cycling", uciStandingsData);
                    
                    if (scoringTeam) {
                        uciStandingsData[index] = {
                            id: scoringTeam.id,
                            teams: scoringTeam.teams,
                            points: scoringTeam.points + 10,
                        }
                        setuciStandingsData(uciStandingsData);
                    } else {
                        console.log("could not find: Efapel Cycling")
                    }
                }
                //add race day to each rider
            })
    };

    const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevel((event.target as HTMLInputElement).value);
        setRaceType("");
    };
    const handleRaceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRaceType((event.target as HTMLInputElement).value);
    };

    return (
        <div>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onClick={toggleOpenClose}>Upload Race Results</Button>

            <Modal
                open={open}
                onClose={toggleOpenClose}
                sx={{ zIndex: 100 }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <FormControl>
                        <FormLabel id="raceLevelForm">Race Level</FormLabel>
                        <RadioGroup
                            defaultValue=""
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
                            (<RadioGroup onChange={handleRaceTypeChange}>
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
                                (<RadioGroup onChange={handleRaceTypeChange}>
                                    <FormControlLabel value="pts" control={<Radio />} label="pro tour stage" />
                                    <FormControlLabel value="ptgc" control={<Radio />} label="pro tour gc" />
                                    <FormControlLabel value="ptodr" control={<Radio />} label="pro tour one day" />
                                </RadioGroup>) :
                                level === 'ct' ?
                                    (<RadioGroup onChange={handleRaceTypeChange}>
                                        <FormControlLabel value="cts" control={<Radio />} label="conti stage" />
                                        <FormControlLabel value="ctgc" control={<Radio />} label="conti gc" />
                                        <FormControlLabel value="ctodr" control={<Radio />} label="conti one day" />
                                        <FormControlLabel value="ctsO" control={<Radio />} label="conti stage" />
                                        <FormControlLabel value="ctgcO" control={<Radio />} label="conti gc" />
                                        <FormControlLabel value="ctodrO" control={<Radio />} label="conti one day" />
                                    </RadioGroup>) : null
                        }
                    </FormControl>
                    <Divider />
                    <Button disabled={level === "" || raceType === ""} sx={{ marginTop: 5 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Choose Excel File
                        <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
                    </Button>
                </Box>
            </Modal>
        </div >
    );
};

export default RaceResultsModal;