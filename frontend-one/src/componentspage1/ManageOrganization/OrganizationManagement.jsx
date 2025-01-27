import React from "react";
import Company from "./Company";
import Branch from "./Branch";
import Department from "./Department";
import JobPosition from "./JobPosition";

const OrganizationMenagement = () => {
    return (
        <>
        <div className="container p-3">

            <div className="mb-3">
                <Company/>
            </div>

            <div className="row mb-3">
                <div className="col-lg-6">
                <Branch/>
                </div>
                <div className="col-lg-6">
                    <Department/>
                </div>
            </div>

            <div className="mb-3">
                <JobPosition/>
            </div>

        </div>
        </>
    )
}

export default OrganizationMenagement;