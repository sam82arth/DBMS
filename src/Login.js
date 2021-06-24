import React, { useState, useEffect } from "react";
import "./Login.css";
import {  auth } from "./firebase";
import { BrowserRouter as Router,Redirect,Switch,Route,Link,} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import AddStudent from './AddStudent'
import TeacherHome from './TeacherHome'
import AdminHome from './AdminHome'


function Login() {
 
  const [email, setEmail] = useState("");
  const [error_msg, seterror_msg] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser]=useState(null)
  const history = useHistory();

  if (error_msg.length > 0) {
    setTimeout(function () {
      seterror_msg("");
    }, 5000);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const SLogin = (event) => {
    event.preventDefault();
    if(email.substring(0,3)==="sft"||email==="admin@vikashighschool.com")
    {
      window.alert("Please login in using Admin and Teacher Portal");
      document.getElementById("container").classList.add("right-panel-active");
    }
    else
    {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      seterror_msg("");
      console.log(error)
      let errorCode = error.code;
      if (
        errorCode === "auth/internal-error" ||
        errorCode === "auth/invalid-email"
      ) {
        seterror_msg("Invalid Email!!");
        setEmail("");
        setPassword("");
      } else if (errorCode === "auth/wrong-password") {
        seterror_msg("Incorrect Password");
        setPassword("");
      } else  {
        seterror_msg("NOT AUTHORIZED!");
        setPassword("");
        setEmail("");
      }
     
    });
  }
 

  };
  const ALogin = (event) => {

    event.preventDefault();
    if(email.substring(0,2)==="st")
    {
      window.alert("Please login in using Student Portal");
    document.getElementById("container").classList.remove("right-panel-active");
    }

    else
    {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      seterror_msg("");
      let errorCode = error.code;
      console.log(error);
      if (
        errorCode === "auth/internal-error" ||
        errorCode === "auth/invalid-email"
      ) {
        seterror_msg("Invalid Email!!");
        setEmail("");
        setPassword("");
      } else if (errorCode === "auth/wrong-password") {
        seterror_msg("Incorrect Password");
        setPassword("");
      } else  {
        seterror_msg("NOT AUTHORIZED!");
        setPassword("");
        setEmail("");
      }
      
    });
  }


  };
  

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  


 
  const signUpButton = () => {
    document.getElementById("container").classList.add("right-panel-active");
    seterror_msg("");
    setEmail("");
    setPassword("");
  };

  const signInButton = () => {
    document.getElementById("container").classList.remove("right-panel-active");
    seterror_msg("");
    setEmail("");
    setPassword("");
  };






  if (navigator.onLine) {
    

    if(user)
    {
      console.log(user)

      // admin
        if(user.email==="admin@vikashighschool.com")
        {

          return(
            <div>
       
            <Router>
              <Switch>
                <Route  path="/" component={AdminHome}>
                  <AdminHome user={user}  />
                </Route>
              </Switch>
            </Router>
            </div>
          );
        }


        else if(user.email.substring(0,3)==="sft")
        {

          //teaching staff
          return (
  
            <Router>
              <Switch>
                <Route exact path="/" component={TeacherHome}>
                  <TeacherHome user={user} id ={user.email.substring(0,3)}/>
                </Route>
              </Switch>
            </Router>
          )
        }
        else
        {
        
          // student
          auth.signOut();
          return(
            <div>{
              
              user.email
            }</div>
          )
        }
      }


      else
        {
          //  no user
          return(

              // Admin and Teacher Portal
             
            <div>
          <div className="container" id="container">
          <div className="form-container sign-up-container">
            <div className  ="login_form" >
            <form action="#" >
              <h1>Admin & Teacher Login</h1>

           
              <input
                className = "login_input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               <br/>
              <input
                className = "login_input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            
            <br/>
              <button className="Signup_button" onClick = {ALogin} >Sign in </button>
              <div className="error"> {error_msg}</div>
            </form>
            </div>
          </div>




          {/* // Student portal */}

          <div className="form-container sign-in-container">
          <div className  ="login_form" >
            <form action="#">
              <h1>Student Login</h1>
              <input
                className = "login_input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br/>
              <input
                className = "login_input"
                type="password"
                placeholder="YYYY-MM-DD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <a>
                <Link to="/Password__Reset">Forgot your password?</Link>
              </a> */}
               <br/>
              <button on onClick ={SLogin}>Sign in</button>
              <div className="error"> {error_msg}</div>
              
            </form>
            </div>
          </div>





          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Hello!</h1>
                <p>Click here for student portal</p>
              
                <button className="ghost" id="signIn" onClick={signInButton}>
                  {/*check for id here as refreshing the page does not support animation and displays error */}
              Student Portal
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello,</h1>
                <p>  Click here for admin & teacher portal  </p>
                <button
                  className="ghost"
                  id="container"
                  onClick={signUpButton}
                >
                 Admin portal
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
          );

        }
    
      }
       
    
  else {
    return (
      <div className="offline">
    
        <div className="no_internet_text">
          You need an active internet connection to keep using my services!
        </div>
      </div>
    );
  }
}


export default Login;