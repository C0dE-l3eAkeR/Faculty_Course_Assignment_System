"use client";
import { Table } from "antd";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './CSS/Faculty_Profile.css'
import {
  DeleteCourse,
  GetAllCourse,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";

const Offer_Course = () => {
  const { data } = useSelector((store) => store.auth);
  const id = data.user.ID;
  const disptach = useDispatch();
  const navigate = useNavigate();
  const columns = [
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    { title: "Course Credit", dataIndex: "courseCredit", key: "courseCredit" },
    { title: "Resolve", dataIndex: "resolve", key: "resolve" },
  ];
  

 const [AllCourses, setApp] = useState([]); 
 const [opened, setop] = useState("closed");
 const course = [{
  courseName : "CSE101",
  courseInitial : "CSE101",
  courseCredit : 3
 }];
 const courseI = "CSE101";
 const courseN ="Intro to pc";
useEffect(() => {
  console.log(1);
  setApp(course);
  axios.get('http://localhost:4000/doctorapp/'+id).then((res) => {
    console.log(res.data)
      setApp(res.data.slice(0, 10));
    //  console.log(posts);
  })
},[]);

const handl = (e)=>{
  console.log("dfdf");
  let patientid = "/patient/"+e;
  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }
 
 }

  const DeleteCrs = (id) => {
    disptach(DeleteCourse(id));
  };
  useEffect(() => {
    disptach(GetAllCourse());
  }, []);

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "doctor") {
    return <Navigate to={"/dashboard"} />;
  }
 
  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Payment_Page">
            <h1 style={{ marginBottom: "1rem", textAlign : "center" }}>Course Panel</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {course?.map((ele) => {
                    return (
                      <tr onClick={()=> setop("opend")}>
                        <td className={opened}><div style={{width : "100%"}}><div style={{width : "30%",float: "left"}}><h1 style={{textAlign:"center"}}>{courseI}<br/>{courseN}</h1></div><div style={{textAlign:"center",width : "10%",float: "left"}}><h1>3</h1></div><div style={{width : "10%",float: "left"}}><button
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
                          </button></div></div></td>
                        
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
