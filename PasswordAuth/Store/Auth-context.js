import React, { useState } from "react";

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login: (token) => {},
    logOut : () => {}
})

export const AuthProvider =(props)=>{
   const[token, setToken] =useState(null)

  const userLoggedIn= !!token;

const  logInHandler =(token)=>{
    setToken(token);
  }

 const logOutHandler =()=>{
    setToken(null);
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
