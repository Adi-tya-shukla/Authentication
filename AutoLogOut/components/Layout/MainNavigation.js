import { Link ,useHistory } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../Store/Auth-context';

const MainNavigation = () => {
const history = useHistory();
const authCtx = useContext(AuthContext);
const logOutHandler = ()=>{
  authCtx.logOut(authCtx.token);
  history.replace('/auth');
}

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn &&  <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {authCtx.isLoggedIn &&
          <li>
          <Link to='/profile'>Profile</Link>
        </li>
          }
          {authCtx.isLoggedIn && <li>
          <button onClick={logOutHandler}>Logout</button>
        </li>}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
