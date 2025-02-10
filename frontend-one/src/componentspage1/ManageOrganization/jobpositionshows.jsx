import axios from "axios";
import React, { useState, useEffect } from "react";
import JobpositionDelete from "./jobpositiondelete";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const JobPositionShows = ({ onPositionAdded, CompanyID }) => {
  const [showjobposition, setShowjobposition] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobposition = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3333/api/getpositions/${CompanyID}`,
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
    <div className=" ">
      <div className="">
        <div className=" ">
          <table className="table table-responsive">
            <tbody>
              {showjobposition.map((ShowsJobPosition, index) => (
                <tr key={index}>
                  <td className="col-1">{index + 1}</td>
                  <td className="col-9">{ShowsJobPosition.name_position}</td>
                  <td className="col-1">
                    <JobpositionDelete
                      id={ShowsJobPosition.id_position}
                      onDeleteSuccess={handleDeleteSuccess}
                    />
                    <button
                      className=" p-0 me-2 btn-animated"
                      onClick={() =>
                        handleEditClick(ShowsJobPosition)
                      }
                    >
                      {" "}
                      <i className="bi bi-pencil-square"></i> {/* แก้ไข */}
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
            value={selectedJob ? selectedJob.name_position : ""}
            onChange={(e) =>
              setSelectedJob((prev) => ({
                ...prev,
                name_position: e.target.value,
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
