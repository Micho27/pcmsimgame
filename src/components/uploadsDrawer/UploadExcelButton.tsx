import { ChangeEvent, useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//import { parse } from "csv-parse/browser/esm/sync";

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

const UploadExcelButton = () => {
    const [csvData, setCsvData] = useState<cvsItem[]>([]);
    const [filename, setFilename] = useState("");

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

    return (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" accept=".xlsm" onChange={handleFileUpload} />
        </Button>
    );
}

export default UploadExcelButton;