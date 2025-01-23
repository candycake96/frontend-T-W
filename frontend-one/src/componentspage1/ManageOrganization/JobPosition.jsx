import React, { useState } from "react";
import axios from "axios";
import JobPositionShows from "./jobpositionshows";
const token = 'accessToken';

const JobPosition = () => {
  const [jobposition, setJobposition] = useState(""); // รับส่งข้อมูลจาก input
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [message, setMessage] = useState("");
  const [positionAdded, setPositionAdded] = useState(false); // state to track if a new position is added

  const createSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!jobposition) {
      setMessage("Job position is required.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7071/api/jobposition_add",
        { position_name: jobposition }, // sending job position
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Job position added successfully!");
      setMessageType("success");
      setJobposition(""); // Clear the input field after success

      // Trigger JobPositionShows update
      setPositionAdded(!positionAdded); // Toggle the positionAdded state to trigger refresh
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "Something went wrong");
      setMessageType("error");
    }
  };

  return (
    <>
      <div className="">
        <div className="p-3">
          <div className="col-lg-12">
            <div className="text-center">
              <h1 className="fs-5 fw-bolder">ตำแหน่งพนักงาน</h1>
            </div>
            <div className="">
              {message && (
                <div
                  className={`alert ${
                    messageType === "success" ? "alert-success" : "alert-danger"
                  }`}
                >
                  {message}
                </div>
              )}
              <form className="" onSubmit={createSubmit}>
                <div className="mb-3">
                  <label htmlFor="jobposition" className="form-label">
                    ชื่อตำแหน่ง
                  </label>
                  <input
                    type="text"
                    placeholder="ตำแหน่งพนักงาน"
                    className="form-control"
                    value={jobposition}
                    onChange={(e) => setJobposition(e.target.value)} // Use onChange to capture input value
                  />
                  <div className="mb-3 p-3 text-center">
                    <button type="submit" className="btn btn-success">
                      เพิ่มข้อมูล
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div> 
        </div> 
        <hr />
        <div className="">
          <JobPositionShows onPositionAdded={positionAdded} /> {/* Pass the state to trigger refresh */}
        </div>
      </div>
      
    </>
  );
};

export default JobPosition;
