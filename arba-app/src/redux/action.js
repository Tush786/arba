import axios from "axios";
import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_TO_CART,
  CART_SIZE,
  EDIT_PRODUCT,
  EDIT_USER,
  GET_CARTDATA,
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
  // console.log(id)
  try {
    const user = await axios.get(`https://arba-backend-1-4267.onrender.com/user/${id}`);

    // // const userObj = {
    // //   userid:user.data.user_present._id,
    // //   username: user.data.user_present.userName,
    // //   fullname: user.data.user_present.fullName,
    // //   avatar:user.data.user_present.avatar
    // // };
    // localStorage.setItem("userdata", JSON.stringify(userObj));
    dispatch({
      type: GET_USER,
      payload: user.data[0],
    });
  } catch (err) {
    console.log(err);
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`https://arba-backend-1-4267.onrender.com/user/signup`, {
      ...user,
    });
    // console.log(res.status);
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
    const res = await axios.post(`https://arba-backend-1-4267.onrender.com/user/login`, {
      ...user,
    });
    // console.log(res.data);
    // console.log(res.data.token);

    const userObj = {
      userid:res.data.user_present._id,
      username: res.data.user_present.userName,
      fullname: res.data.user_present.fullName,
      avatar:res.data.user_present.avatar
    };

    // console.log(userObj)
    
    localStorage.setItem("userdata", JSON.stringify(userObj));

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
    const res = await axios.get(`https://arba-backend-1-4267.onrender.com/user/${_id}`);
    // console.log(res);
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

export const editUser = (user,id) => async (dispatch) => {
  console.log(user,id)
  try {
   const resp= await axios.patch(`https://arba-backend-1-4267.onrender.com/user/editUser/${id}`, {
      ...user,
    });
    // console.log(resp)
    // dispatch({
    //   type: EDIT_USER,
    //   payload: user,
    // });
  } catch (err) {
    console.log(err);
  }
};

export const editAvatar = (avatar,id) => async (dispatch) => {
  console.log(avatar,id)
  try {
   const resp= await axios.patch(`https://arba-backend-1-4267.onrender.com/user/avatar/${id}`, avatar);
    // console.log(resp)
    // dispatch({
    //   type: EDIT_USER,
    //   payload: user,
    // });
  } catch (err) {
    console.log(err);
  }
};

// <=================== Change Password ===============================>
  export const changepassword = (passobj,id) => async (dispatch) => {
    console.log(passobj,id)
    try {
     const resp= await axios.put(`https://arba-backend-1-4267.onrender.com/user/changepassword/${id}`, {
        ...passobj,
      });
      // console.log(resp)
    } catch (err) {
      console.log(err);
    }
  };

// <------------------- Product Action ------------->
export const getproducts = (sort) => async (dispatch) => {
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const products = await axios.get(`https://arba-backend-1-4267.onrender.com/product/get?sort=${sort}`,config);
    // console.log(products)
    dispatch({
      type: GET_DATA,
      payload: products.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeproduct = (id) => async (dispatch) => {
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const resp = await axios.delete(
      `https://arba-backend-1-4267.onrender.com/product/delete/${id}`,config
    );
    // console.log(resp.data);
    dispatch({
      type: REMOVE_PRODUCT,
      payload: id,
    });
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
    const res = await axios.post(`https://arba-backend-1-4267.onrender.com/product/create`, product,config
    );
    // console.log(res.status);
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

export const editproduct = (product, id) => async (dispatch) => {
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    await axios.patch(`https://arba-backend-1-4267.onrender.com/product/update/${id}`, 
      product,config
    );
    dispatch({
      type: EDIT_PRODUCT,
      payload: product,
    });
  } catch (err) {
    console.log(err);
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
    const res = await axios.post(`https://arba-backend-1-4267.onrender.com/category/create`, 
      Category,config
    );
    // console.log(res.status);
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

  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const products = await axios.get(`https://arba-backend-1-4267.onrender.com/category/get`,config);
    dispatch({
      type: GET_CATEGORY,
      payload: products.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editcategory = (category, id) => async (dispatch) => {

  const token = localStorage.getItem("Token");
  // console.log(token)
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    await axios.patch(`https://arba-backend-1-4267.onrender.com/category/update/${id}`, 
      category,config
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
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const resp = await axios.delete(
      `https://arba-backend-1-4267.onrender.com/category/delete/${id}`,config
    );
    // console.log(resp.data);
    dispatch({
      type: REMOVE_CATEGORY,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

// <------------- ADD TO Cart ------------------------------>
export const addtoCart = (cart) => async (dispatch) => {
  // console.log(cart)
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const res = await axios.post(`https://arba-backend-1-4267.onrender.com/cart/create`, 
     cart, // Pass the cart object directly
     config // Pass the authorization headers
    );
    // console.log(res.orderItems);
    dispatch({
      type: ADD_TO_CART,
      payload: res.status,
    });
  } catch (err) {
    console.log(err);
    // Handle errors if needed
  }
};

export const getcart = () => async (dispatch) => {
  const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const carts = await axios.get(`https://arba-backend-1-4267.onrender.com/cart/get`,config);
    // console.log(carts.data[0].orderItems.length);
    dispatch({
      type:CART_SIZE,
      payload:carts.data[0].orderItems.length
    })
    dispatch({
      type: GET_CARTDATA,
      payload: carts.data[0].orderItems,
    });
  } catch (err) {
    console.log(err);
  }
};


export const editcartitems = () => async (dispatch) => {

  // const token = localStorage.getItem("Token");
  // const config = {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //   },
  // };
  // try {
  //   const carts = await axios.get(`http://localhost:7777/cart/get`,config);
  //   console.log(carts)
  //   dispatch({
  //     type: GET_CARTDATA,
  //     payload: carts.data,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};


export const removecart=(_id)=>async(dispatch)=>{ 
  console.log(_id)
    const token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
     const resp=await axios.delete(`https://arba-backend-1-4267.onrender.com/cart/delete/${_id}`,config)
     console.log(resp)
    
  } catch (error) {
     console.log(error)
  }
}