import React from "react";
import MainternanceAnanlysis_Add from "./MainternanceAnalysis_Add";

const MainternanceAnanlysis_ShowDetails = ({maintenanceJob}) => {

    return (
        <div className="">
           <MainternanceAnanlysis_Add  maintenanceJob={maintenanceJob}/>
        </div>
    );
};

export default MainternanceAnanlysis_ShowDetails;