import axios from "axios";
import {
  EDIT_USER,
  GET_DATA,
  GET_USER,
  LOGIN_USER,
  POST_USER,
  RESET_USER,
} from "./actiontype";

export const getUser = (id) => async (dispatch) => {
  try {
    const user = await axios.get(
      `https://taskbackend-u0a1.onrender.com/user/${id}`
    );
    dispatch({
      type: GET_USER,
      payload: user.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:7777/user/signup`, {
      ...user,
    });
    console.log(res.status);
    dispatch({
      type: POST_USER,
      payload: res.status,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: RESET_USER,
      payload: err.response.status,
    });
  }
};

// <------------ Login User ---------------------->
export const LoginUser = (user) => async (dispatch) => {
  console.log(user);
  try {
    const res = await axios.post(`http://localhost:7777/user/login`, {
      ...user,
    });
    console.log(res.data);
    console.log(res.data.token);

    localStorage.setItem("Token", res.data.token);
    dispatch({
      type: LOGIN_USER,
      payload: {
        currUser: res.data.user_present,
        statuscode: res.status,
        token: res.data.token,
      },
    });
  } catch (err) {
    dispatch({
      type: RESET_USER,
      payload: err.status,
    });
  }
};

export const setUser = (_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:7777/user/${_id}`
    );
    console.log(res);
    dispatch({
      type: LOGIN_USER,
      payload: { currUser: res.data[0], statuscode: res.status },
    });
  } catch (err) {
    dispatch({
      type: RESET_USER,
      payload: err.response.status,
    });
  }
};

export const editUser = (user) => async (dispatch) => {
  try {
    await axios.patch(
      `hhttp://localhost:7777/user/editUser/${user._id}`,
      {
        ...user,
      }
    );
    dispatch({
      type: EDIT_USER,
      payload: user,
    });
  } catch (err) {
    console.log(err);
  }
};


export const getproducts = () => async (dispatch) => {
  try {
    const products = await axios.get(
      `http://localhost:7777/product/get`
    );
    dispatch({
      type: GET_DATA,
      payload: products.data,
    });
  } catch (err) {
    console.log(err);
  }
};