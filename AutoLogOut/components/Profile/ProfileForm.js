import React, { useContext, useRef, useState } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/Auth-context';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();
const passRef = useRef();

const [loading ,setLoading] = useState(false);

const submitHandler = (event)=>{
event.preventDefault();

const enteredPass = passRef.current.value;
setLoading(true);
fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD0wtZAEfKZ3k09iNLSFImhO9lsXjOFrNg',{
  method :'POST',
  body : JSON.stringify({
    idToken : ctx.token,	
    password	: enteredPass,
    returnSecureToken : false,
  }),
  headers:{
    'Content-Type' : "application/json"
  }
}).then((response)=>{
  
   history.replace('/auth')
   setLoading(false)
})

}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={passRef}/>
      </div>
      <div className={classes.action}>
        {loading && <p>Sending Request....</p>}
        {
          !loading &&
          <button>Change Password</button>
        }
      </div>
    </form>
  );
}

export default ProfileForm;
