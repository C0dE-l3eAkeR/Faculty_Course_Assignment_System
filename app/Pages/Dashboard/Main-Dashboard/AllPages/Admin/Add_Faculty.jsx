"use client";
import React, { useState } from "react";
import "./CSS/Add_Faculty.css";
import doctor from "../../../../../img/doctoravatar.png";
import { useDispatch, useSelector } from "react-redux";
import { FacultyRegister, SendPassword } from "../../../../../Redux/auth/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Image from "next/image";
const notify = (text) => toast(text);

const Add_Faculty = () => {

  console.log(1);
  const { data } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const initData = {
    facultyName: "",
    facultyAge: "",
    facultyMobile: "",
    facultyEmail: "",
    facultyBloodGroup: "",
    facultyGender: "",
    facultyAddress: "",
    facultyEducation: "",
    facultyDepartment: "",
    facultyID: "",
    facultyPassword: "",
    facultyInitial :"",
    details: "",
  };
  const [FacultyValue, setFacultyValue] = useState(initData);

  const HandleDoctorChange = (e) => {
    setFacultyValue({ ...FacultyValue, [e.target.name]: e.target.value });
  };

  const HandleDoctorSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(FacultyRegister(FacultyValue)).then((res) => {
      if (res.message === "Doctor already exists") {
        setLoading(false);
        return notify("Doctor Already Exist");
      }
      if (res.message === "error") {
        setLoading(false);
        return notify("Something went wrong, Please try Again");
      }

      let data = {
        email: res.data.email,
        password: res.data.password,
        userId: res.data.docID,
      };
      console.log(data, "DOCTOR REGISTER SUCCESSFULLY");
      dispatch(SendPassword(data)).then((res) => notify("Account Detais Sent"));
      setLoading(false);
      setFacultyValue(initData);
    });
  };

  if (data?.isAuthticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Add Faculty</h1>
            <Image src={doctor} alt="doctor" className="avatarimg" />
            <form onSubmit={HandleDoctorSubmit}>
              <div>
                <label>Faculty Name</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="facultyName"
                    value={FacultyValue.facultyName}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Age</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Age"
                    name="facultyAge"
                    value={FacultyValue.facultyAge}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label> Number</label>
                <div className="inputdiv">
                  <input
                    type="number"
                    placeholder="Emergency Number"
                    name="facultyMobile"
                    value={FacultyValue.facultyMobile}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Email</label>
                <div className="inputdiv">
                  <input
                    type="email"
                    placeholder="abc@abc.com"
                    name="facultyEmail"
                    value={FacultyValue.facultyEmail}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Gender</label>
                <div className="inputdiv">
                  <select
                    name="facultyGender"
                    value={FacultyValue.facultyGender}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="Choose Gender">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Blood Group</label>
                <div className="inputdiv">
                  <select
                    name="facyltyBloodGroup"
                    value={FacultyValue.bloodGroup}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="Choose Blood Group">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            
              <div>
                <label>Address</label>
                <div className="inputdiv adressdiv">
                  <input
                    type="text"
                    placeholder="Address"
                    name="facultyFddress"
                    value={FacultyValue.facultyAddress}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Education</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="eg.PHD"
                    name="facultyEducation"
                    value={FacultyValue.facultyEducation}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Initial</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="eg.ABO"
                    name="facultyInitial"
                    value={FacultyValue.facultyInitial}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Department</label>
                <div className="inputdiv">
                  <select
                    name="facultyDepartment"
                    value={FacultyValue.facultyDepartment}
                    onChange={HandleDoctorChange}
                    required
                  >
                    <option value="General">Select</option>
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="ETE">ETE</option>
                    <option value="Math & Physics">Math & Physics</option>
                    <option value="BBA">BBA</option>
                    <option value="Archi">Archi</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </div>
              </div>
              <div>
                <label>ID</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="ID"
                    name="facultyID"
                    value={FacultyValue.facultyID}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Password</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Password"
                    name="facultyPassword"
                    value={FacultyValue.facultyPassword}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Other Details</label>
                <div className="inputdiv">
                  <textarea
                    type="text"
                    placeholder="Extra Info"
                    rows="4"
                    cols="50"
                    name="details"
                    value={FacultyValue.details}
                    onChange={HandleDoctorChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add_Faculty;
