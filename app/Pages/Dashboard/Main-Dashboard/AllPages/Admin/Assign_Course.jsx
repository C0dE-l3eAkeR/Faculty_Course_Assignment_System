"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { assignFaculty, GetFaculty } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";

const Assign_Course = () => {
  const { data } = useSelector((store) => store.auth);
  let act ="";
  if(data?.user.userType === "admin") act = "Assign";
  
  console.log(data?.user.userType );

  const dispatch = useDispatch();

  const { faculty } = useSelector((state) => state.data);

  const AssignFaculty = (ID) => {
    let data = {
      Assigned: "Assign",
      ID,
    };
    dispatch(assignFaculty(data));
  };

  useEffect(() => {
    dispatch(GetFaculty());
  }, [dispatch]);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Payment_Page">
            <h1 style={{ marginBottom: "2rem" }}>Faculty List</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Faculty Initial</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty?.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.facultyInitial}</td>
                        <td style={{ marginLeft: "1rem" }}>{ele.facultyName}</td>
                       <td>
                        {data?.user.userType === "admin" ?(
                          <button 
                            style={{
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              color:
                                ele.Assigned === "Assign" ? "gray" : "red",
                              cursor:
                                ele.Assigned === "Assign" ? "" : "pointer",
                            }}
                            onClick={() => AssignFaculty(ele.ID)}
                          >
                            {act}
                          </button>):(<button 
                          
                            style={{
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              color:
                                ele.Assigned === "Assigned" ? "gray" : "red",
                              cursor:
                                ele.Assigned === "Assigned" ? "" : "pointer",
                            }}
                            onClick={() => AssignFaculty(ele.ID)}
                          >
                            {act}
                          </button>)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assign_Course;
