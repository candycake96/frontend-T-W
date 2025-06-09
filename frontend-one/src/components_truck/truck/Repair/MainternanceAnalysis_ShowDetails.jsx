import React from "react";
import MainternanceAnanlysis_Add from "./MainternanceAnalysis_Add";

const MainternanceAnanlysis_ShowDetails = ({maintenanceJob}) => {

    return (
        <div className=" mb-4 shadow-sm border-0">
           <MainternanceAnanlysis_Add  maintenanceJob={maintenanceJob}/>
        </div>
    );
};

export default MainternanceAnanlysis_ShowDetails;