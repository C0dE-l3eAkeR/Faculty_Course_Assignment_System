"use client";
import { Table } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './CSS/Faculty_Profile.css'

import Sidebar from "../../GlobalFiles/Sidebar";
import { University } from "../backend";
import { faculty } from "../../../Dashboard-Login/DLogin";

const Room_Routine = () => {
  const course = faculty.offerdCourses;
  let routine=[];
  let rr =[];
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
  const times1 = ["08.00am","09.10am","10.20am","11.30am","12.40pm","01.50pm","03.00pm","04.10pm","05.20pm"];
  const times2 = ["09.00am","10.10am","11.20am","12.30pm","01.40pm","02.50pm","04.00pm","05.10pm","06.20pm"];
  const rooms = ["101","102"];
  course.map((e)=>{
    const rnum =rooms.indexOf(e.room.number);
    const stim =times1.indexOf(e.startTime);
    const etim =times1.indexOf(e.endTime);
    const d1 = days.indexOf(e.day1);
    const d2 = days.indexOf(e.day2);
   
 
    
    routine.push({course:e.course.name,stim:e.startTime,etim:e.endTime});
    routine.push({course:e.course.name,stim:e.startTime,etim:e.endTime});
   console.log(routine['sat']);
     })
  
    
 console.log(course);
  //const id = data.user.ID;
 
  const navigate = useNavigate();
  const columns = [
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    { title: "Course Credit", dataIndex: "courseCredit", key: "courseCredit" },
    { title: "Resolve", dataIndex: "resolve", key: "resolve" },
  ];
  

 const [AllCourses, setApp] = useState([]); 
 const [opened, setop] = useState(true);
 
 const courseI = "CSE101";
 const courseN ="Intro to pc";

function toggle() {
  setop(!opened);
}


  const DeleteCrs = (id) => {
 
  };


  return (
    <>
      <div className="container">
        <Sidebar userType="faculty"/>
        <div className="AfterSideBar">
          <div className="Payment_Page">
            <h1 style={{ marginBottom: "1rem", textAlign : "center" }}>Course Panel</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Sat</th>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thurs</th>
                  </tr>
                </thead>
                <tbody>
                  {routine?.map((ele) => {
                    return (
                      <tr key={ele.name} style={{}} onClick={()=> toggle()}>
                        
                        <td  className=""><h1 >{ele.course.name}</h1></td>
                        <td><h1>{ele.room.number}</h1></td>
                        <td><h1>{ele.time.startTime}</h1></td>
                        <td><h1>{ele.time.endTime}</h1></td>
                        <td><h1>{ele.time.day1}</h1></td>
                        <td><h1>{ele.time.day2}</h1></td>
                        <td><h1>{}</h1></td>
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

export default Room_Routine;
