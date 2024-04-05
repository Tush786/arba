import { EDIT_USER, GET_DATA, GET_USER, LOGIN_USER, LOGOUT_USER, POST_USER, RESET_USER } from "./actiontype";

  
  const initialState = {
    user: {},
    loggedIn: false,
    status: "",
    token: "",
    statuscode:"",
    products:[]
  };
  
  export const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_USER:
        return { ...state, user: payload };
      case EDIT_USER:
        return { ...state, user: payload };
      case POST_USER:
        return { ...state, statuscode: payload };
      case LOGIN_USER:
        return {
          ...state,
          user: payload.currUser,
          statuscode: payload.statuscode,
          loggedIn: true,
          token: payload.token,
        };
      case LOGOUT_USER:
        return { ...state, user: {}, loggedIn: false, token: "" };
      case RESET_USER:
        return { ...state, statuscode: payload };
      case GET_DATA:
        return { ...state, products: payload };
      default:
        return state;
    }
  };
  