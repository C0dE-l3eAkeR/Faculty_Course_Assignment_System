"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { assignFaculty, GetFaculty } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { University } from "../backend";


const Assign_Course = () => {

  const faculties = University.faculties;

  const userType = "admin";
  const dispatch = useDispatch();



  const AssignFaculty = (ID) => {
   
  };




  return (
    <>
      <div className="container">
      <Sidebar userType="admin"/>
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
                  {faculties.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.name}</td>
                        <td style={{ marginLeft: "1rem" }}>{ele.facultyName}</td>
                       <td>
                          <button 
                            style={{
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              color:
                             "red",
                              cursor:
                               "pointer",
                            }}
                            onClick={() => AssignFaculty(ele.ID)}
                          >
                            assign
                          </button>
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
