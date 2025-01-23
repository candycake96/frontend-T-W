import axios from "axios";
import React, { useState, useEffect } from "react";
import JobpositionDelete from "./jobpositiondelete";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const JobPositionShows = ({ onPositionAdded }) => {
  const [showjobposition, setShowjobposition] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobposition = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7071/api/jobposition",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setShowjobposition(response.data);
    } catch (error) {
      console.error("Error fetching job positions:", error);
    }
  };

  // Fetch job positions when component mounts
  useEffect(() => {
    fetchJobposition();
  }, []);

  // Handle the successful delete by removing the job position from the list
  const handleDeleteSuccess = (id) => {
    setShowjobposition((prevPositions) =>
      prevPositions.filter((jobPosition) => jobPosition.id !== id)
    );
  };

  // Trigger fetchJobposition when new position is added
  useEffect(() => {
    if (onPositionAdded) {
      fetchJobposition();
    }
  }, [onPositionAdded]);

  const handleEditClick = (job) => {
    setSelectedJob(job);
    const dialog = document.getElementById("my_modal_4");
    dialog.showModal();
  }

  
  return (
    <div className="">
      <div className="p-3 text-center">
        <h3>ข้อมูลตำแหน่ง</h3>
      </div>

      <div className="p-6">
        <div className="card ">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ชื่อตำแหน่ง</th>
                <th scope="col">#</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              {showjobposition.map((ShowsJobPosition, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ShowsJobPosition.position_name}</td>
                  <td className="col-2">
                    <JobpositionDelete
                      id={ShowsJobPosition.position_id}
                      onDeleteSuccess={handleDeleteSuccess}
                    />
                  </td>
                  <td className="col-2">
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        handleEditClick(ShowsJobPosition)
                      }
                    >
                      {" "}
                      แก้ไข
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
               <input
            type="text"
            className="form-control"
            value={selectedJob ? selectedJob.position_name : ""}
            onChange={(e) =>
              setSelectedJob((prev) => ({
                ...prev,
                position_name: e.target.value,
              }))
            }
          />
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default JobPositionShows;
