import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const[sending , setSending] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSending(true);
    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;

    if (isLogin) {

    }
    else {
       fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0wtZAEfKZ3k09iNLSFImhO9lsXjOFrNg',
       {
        method: 'POST',
        body: JSON.stringify({
        email :  enteredEmail,
          password : enteredPass,
          returnSecureToken :true
        }),
        headers:{
                'Content-Type' : 'application/json'
        }
       }).then((response)=>{
        setSending(false);
            if(response.ok){
              alert('user created')

            }else{
             return response.json().then((data)=>{
                console.log(data);
                alert(data.error.message)
              });
            }
          }
       )
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passRef}
          />
             {sending && <p 
             style={{
              color: 'aqua'
             }}>
              sending Request</p>}
        </div>
        <div className={classes.actions}>
          <button type='submit'>{
            isLogin ? 'LogIn' : 'Create Account'
          }</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
