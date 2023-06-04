import * as types from "./types";
import axios from "axios";



//login user
export const FacultyLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_FACULTY_REQUEST });
    const res = await axios.post(
      "http://localhost:4000/doctor_user",
      data
    );
    console.log(res.data);
    dispatch({
      type: types.LOGIN_FACULTY_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_FACULTY_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

//login user
export const AdminLogin = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_ADMIN_REQUEST });
    const res = await axios.post(
      "https://zany-gray-clam-gear.cyclic.app/admin/login",
      data
    );
    console.log(res.data);
    dispatch({
      type: types.LOGIN_ADMIN_SUCCESS,
      payload: {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token,
      },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.LOGIN_ADMIN_ERROR,
      payload: {
        message: error,
      },
    });
  }
};

// REGISTER DOCTOR
export const FacultyRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_FACULTY_REQUEST });
    const res = await axios.post(
      "https://zany-gray-clam-gear.cyclic.app/doctors/register",
      data
    );
     console.log(res);
    return res.data;
    // dispatch({
    //   type: types.REGISTER_FACULTY_SUCCESS,
    //   payload: {
    //     message: res.data.message,
    //     user: res.data.user,
    //     // token: res.data.token,
    //     report: res.data.report,
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.REGISTER_FACULTY_ERROR,
      payload: {
        message: error,
      },
    });
  }
};



// REGISTER ADMIN
export const AdminRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_ADMIN_REQUEST });
    const res = await axios.post(
      "https://zany-gray-clam-gear.cyclic.app/admin/register",
      data
    );
    // console.log(res);
    return res.data;
    // dispatch({
    //   type: types.REGISTER_ADMIN_SUCCESS,
    //   payload: {
    //     message: res.data.message,
    //     user: res.data.user,
    //     // token: res.data.token,
    //     report: res.data.report,
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.REGISTER_ADMIN_ERROR,
      payload: {
        message: error,
      },
    });
  }
};



// logout user
export const authLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};



//update doctor
export const UpdateFaculty = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_FACULTY_REQUEST });
    const res = await axios.patch(
      `https://zany-gray-clam-gear.cyclic.app/doctors/${id}`,
      data
    );
    console.log(res);
    dispatch({ type: types.EDIT_FACULTY_SUCCESS, payload: res.data.user });
  } catch (error) {
    console.log(error);
  }
};

//update doctor
export const SendPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_FACULTY_REQUEST });
    const res = await axios.post(
      `https://zany-gray-clam-gear.cyclic.app/admin/password`,
      data
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//update doctor
export const forgetPassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.FORGET_PASSWORD_REQUEST });
    const res = await axios.post(
      `https://zany-gray-clam-gear.cyclic.app/admin/forgot`,
      data
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
