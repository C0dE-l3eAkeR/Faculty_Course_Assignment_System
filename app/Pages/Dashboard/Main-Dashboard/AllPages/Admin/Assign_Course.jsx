"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, message, Modal } from "antd";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import Sidebar from "../../GlobalFiles/Sidebar";
import { University } from "../backend";


const Assign_Course = () => {

  const faculties = University.faculties;

  const userType = "admin";

  const startTime = ["08.00am","09.10am"];
  const endTime = ["09.00am","10.10am"];
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  
  const [formData, setFormData] = useState({
   startTime : "",
   endTime: "",
   day1: "",
   day2: ""
  });
  
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleFormSubmit = () => {
    const time = new Timing(formData.startTime, formData.endTime, formData.day1, formData.day2);
    University.offerCrs(fac1,University.courses[0],time);
    console.log(fac1.offerdCourses);
    handleOk();
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  


  const AssignFaculty = (ID) => {
   
  };




  return (
    <>
      <div className="container">
      <Sidebar userType="admin"/>
        <div className="AfterSideBar">
          <div className="Payment_Page">
          <div>
              <Modal
                title="Selcet Timing"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" onClick={handleFormSubmit}>
                   Offer
                  </Button>,
                ]}
              >
                <form className="inputForm">
              
                  <select name="startTime" onChange={handleFormChange}>
                    <option value="">Select Start Time</option>
                    {startTime.map((ele) => {
                      return (
                        <option key="" value={ele}>
                          {ele}
                        </option>
                      );
                    })}
                  </select>
                  <select name="endTime" onChange={handleFormChange}>
                    <option value="">Select End Time</option>
                    {endTime.map((ele) => {
                      return (
                        <option key="" value={ele}>
                          {ele}
                        </option>
                      );
                    })}
                  </select>
                  <select name="day1" onChange={handleFormChange}>
                    <option value="">Select Day1</option>
                    {days.map((ele) => {
                      return (
                        <option key="" value={ele}>
                          {ele}
                        </option>
                      );
                    })}
                  </select>
                  <select name="day2" onChange={handleFormChange}>
                    <option value="">Select Day2</option>
                    {days.map((ele) => {
                      return (
                        <option key="" value={ele}>
                          {ele}
                        </option>
                      );
                    })}
                  </select>
                </form>
              </Modal>
            </div>
            <h1 style={{ marginBottom: "2rem" }}>Faculty List</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Faculty Name</th>
                    <th>Id</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {faculties.map((ele) => {
                    return (
                      <tr>
                        <td>{ele.name}<br/><div className="singleitemdiv">
                <button  onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                 <div style={{ }}> Offer Course</div>
                </button>
              </div>
              </td>
                        <td style={{ marginLeft: "1rem" }}>{ele.id}</td>
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
                            onClick={() => deleteFaculty(ele.ID)}
                          >
                           delete
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
