import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

type AppIconPropsType = {
    appId: string;
    name:string;
    applicationUrl:string;
};

const AppIcon = (props: AppIconPropsType) => {
    const {appId, name, applicationUrl} = props;
    return (
        <ul>
            <Link to={applicationUrl} >
                <Typography>
                    {name}
                </Typography>
            </Link>
        </ul>
    );
};


export default AppIcon;