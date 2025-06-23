import React, { useState } from "react";
import MainternanceAnalysisApprover from "./MainternanceAnalysisApprover";

const MainternanceAnalysisApproverMain = ({maintenanceJob}) => {
    
    const [isApproverShowData, setApprovershowData] = useState([]);
    // const 

    return (
        <>

        <MainternanceAnalysisApprover  maintenanceJob={maintenanceJob} />


        </>
    )
}

export default MainternanceAnalysisApproverMain;