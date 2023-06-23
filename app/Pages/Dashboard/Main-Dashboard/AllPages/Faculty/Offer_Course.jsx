"use client";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import './CSS/Faculty_Profile.css'
import {
  DeleteCourse,
  GetAllCourse,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";

import { fac1 } from "./Faculty_Profile";
import { University,Timing } from "../backend";





const Offer_Course = () => {
  console.log(fac1.creditcount);
  const { data } = useSelector((store) => store.auth);
 
  const disptach = useDispatch();
  const navigate = useNavigate();
  const columns = [
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    { title: "Course Credit", dataIndex: "courseCredit", key: "courseCredit" },
    { title: "Resolve", dataIndex: "resolve", key: "resolve" },
  ];
  

 const [AllCourses, setApp] = useState([]); 
 const [opened, setop] = useState(true);
 const course = University.courses;



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


function toggle() {
  setop(!opened);
}

 const [selectedRow, setSelectedRow] = useState(null);
 const handleRowClick = (rowId) => {
  toggle();
  if(opened)
  setSelectedRow(rowId);
  else
  setSelectedRow(null);
};
const startTime = ["08.00am","09.10am"];
const endTime = ["09.00am","10.10am"];
const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const DeleteCrs = (id) => {
    disptach(DeleteCourse(id));
  };
  useEffect(() => {
    disptach(GetAllCourse());
  }, []);
/*
  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }
 */
  return (
    <>
      <div className="container">
        <Sidebar userType="faculty" />
        <div className="AfterSideBar">
          <div className="Payment_Page">
            <h1 style={{ marginBottom: "1rem", textAlign : "center" }}>Course Panel</h1>
            <div className="patientBox">
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
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {course?.map((ele) => {
                    return (
                      <tr key={ele.name}
                 
                      onClick={() => handleRowClick(ele.name)}>
                        <td><h1>{ele.name}</h1><br /><div className="singleitemdiv">
                <button  onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                 <div style={{ paddingLeft: "225px" }}> Offerr Course</div>
                </button>
              </div></td>
                        <td><h1>{ele.credit}</h1></td>
                        <td><button
                            style={{
                              border: "none",
                              color: "red",
                              outline: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            onClick={() => DeleteCrs(ele.ID)}
                          >
                           Delete
                          </button></td>
                        
                       {/*} <td>
                          <button
                            style={{
                              border: "none",
                              color: "red",
                              outline: "none",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                            onClick={() => DeleteCrs(ele.ID)}
                          >
                           Delete
                          </button>
                        </td>*/}
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

export default Offer_Course;
