import axios from "axios";
import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  EDIT_USER,
  GET_CATEGORY,
  GET_DATA,
  GET_USER,
  LOGIN_USER,
  POST_USER,
  REMOVE_CATEGORY,
  REMOVE_PRODUCT,
  RESET_USER,
  UPDATE_CATEGORY,
} from "./actiontype";

export const getUser = (id) => async (dispatch) => {
  try {
    const user = await axios.get(
      `http://localhost:7777/user/${id}`
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
      `http://localhost:7777user/editUser/${user._id}`,
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

// <------------------- Product Action ------------->
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


export const removeproduct = (id) => async (dispatch) => {
  try {
  const resp=  await axios.delete(
      `http://localhost:7777/product/delete/${id}`,
    );
   console.log(resp.data)
   dispatch({
    type:REMOVE_PRODUCT,
    payload:id
   })
  } catch (err) {
    console.log(err);
  }
};

export const Addproduct = (product) => async (dispatch) => {
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const res = await axios.post(`http://localhost:7777/product/create`, {
      ...product
    });
    console.log(res.status);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.status,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: RESET_USER,
    //   payload: err.response.status,
    // });
  }
};


// <------------------Category Action 
export const addcategory = (Category) => async (dispatch) => {
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const res = await axios.post(`http://localhost:7777/category/create`, {
      ...Category
    });
    console.log(res.status);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.status,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: RESET_USER,
    //   payload: err.response.status,
    // });
  }
};

export const getcategory = () => async (dispatch) => {
  try {
    const products = await axios.get(
      `http://localhost:7777/category/get`
    );
    dispatch({
      type: GET_CATEGORY,
      payload: products.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editcategory = (category,id) => async (dispatch) => {
  try {
    await axios.patch(
      `http://localhost:7777/category/update/${id}`,
      {
        ...category,
      }
    );
    dispatch({
      type: UPDATE_CATEGORY,
      payload: category,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removecategory = (id) => async (dispatch) => {
  try {
  const resp=  await axios.delete(
      `http://localhost:7777/category/delete/${id}`,
    );
   console.log(resp.data)
   dispatch({
    type:REMOVE_CATEGORY,
    payload:id
   })
  } catch (err) {
    console.log(err);
  }
};