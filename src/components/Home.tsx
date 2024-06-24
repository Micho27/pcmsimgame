import React, { ReactNode } from "react";
import AppIcon from "./AppIcon";
import apps from "../utils/apps.json";

const Home = () => {
    const enabledApps = apps.map((app,key:number) => (
        <AppIcon key={key} appId={app.applicationID} name={app.name} applicationUrl={app.applicationUrl}/>
      ));
    
    return (
        <div>{enabledApps}</div>
    );
};

export default Home;