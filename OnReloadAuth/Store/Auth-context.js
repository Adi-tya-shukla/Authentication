import React, { useState } from "react";
// import {useHistory} from 'react-router-dom';

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login: (token) => {},
    logOut : () => {}
})

export const AuthProvider =(props)=>{
// const history = useHistory();
  const initialToken = localStorage.getItem('token')
   const[token, setToken] =useState(initialToken)

  const userLoggedIn= !!token;

const  logInHandler =(token)=>{
  localStorage.setItem('token',token)
    setToken(token);
  }

 const logOutHandler =()=>{
    setToken(null);
    localStorage.removeItem('token')
  }

  const contextValue ={
  token : token,
  login : logInHandler,
  logOut : logOutHandler,
  isLoggedIn : userLoggedIn
  }


    return <AuthContext.Provider  value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext;
