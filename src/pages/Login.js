import React, { useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { userSignup, userSignin } from "../Api/auth";
import { useNavigate } from "react-router-dom";
import "../style/login.css";

function Login() {

  const [signUp, setSignup] = useState(false);
  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userType, setUserType] = useState("CUSTOMER")
  const [error, setError] = useState(false)


 

  const signupFn = (e) => {
    const data = {
      name: userName,
      userId: userId,
      email: userEmail,
      userType: userType,
      password: userPassword
  };


    //console.log("DATA", data);

    e.preventDefault();

    
    userSignup(data).then(function (response) {
            if (response.status === 201) {
              setSignup(false)
            
              setError(false)
              setMessage("Signed Up Successfull.You can Signin now")
            }
        })
        .catch(function (error) {
            if(error.response.status===400)
            {
                setError(true)
                setMessage(error.response.data.message);
            
                }    
            else
                console.log(error);
        });
  };
  const history = useNavigate();

  const loginFn = (e) => {
    const data = {
      userId: userId,
      password: userPassword,
    };
    
    e.preventDefault();

    userSignin(data)
      .then(function (response) {
       // console.log(response);

      
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userTypes", response.data.userTypes);
        localStorage.setItem("userStatus", response.data.userStatus);
        localStorage.setItem("token", response.data.accessToken);

        if (response.data.userTypes === "CUSTOMER") {
          history("/customer");
        } else if (response.data.userTypes === "ENGINEER") {
          history("/engineer");
        } else {
          history("/admin");
        }

      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message);
        } else {
          console.log(error);
          setMessage(error.resonse.data.message);

        }
      });
  };

  const updateSignupData = (e) => {
    setMessage("")
    if(e.target.id === "userId")
      setUserId(e.target.value)
    else if(e.target.id === "password")
      setUserPassword(e.target.value)
    else if(e.target.id === "password")
      setUserPassword(e.target.value)
    else if(e.target.id === "username")
      setUserName(e.target.value)
    else
      setUserEmail(e.target.value)
  };

  const toggleSignUp = () => {
   
    setSignup(!signUp);

  }

  const handleSelect = (e) => {
    setUserType(e)

  }



  return (
    <div className=" d-flex justify-content-center align-items-center vh-100" id="body">
      <div className="card m-5 p-5" id="card">
        <div className="row">
          <div className="col">
            {!signUp ? (
              <div className="login">
           
                <form onSubmit={loginFn}>
                  <input
                    className="input-group  m-2 "
                    type="text"
                    placeholder="Enter your userId"
                    id="userId"
                    onChange={updateSignupData}
                  />
                  <input
                    className="input-group  m-2"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={updateSignupData}
                  />
                  <div className="d-flex">
                  <button className="btn   m-2  justify-content-center " id="loginbtn" >
                    Login 
                  </button>
                  <div
                    className="text-center text-warning"
                    onClick={() => toggleSignUp()}
                  >
                   <button className="btn  justify-content-center " id="signupbtn">
                    Signup
                   </button>
                  </div>
                  </div>
                  
                  <div className="text-danger text-center">{message}</div>
                </form>
              </div>
            ) : (
              <div className="signup">
             
                <form onSubmit={signupFn}>
                  <input
                    className="input-group m-2 "
                    type="text"
                    placeholder="Enter your Name"
                    id="username"
                    onChange={updateSignupData}
                  />
                  <input
                    className="input-group m-2 "
                    type="text"
                    placeholder="Enter your userId"
                    id="userId"
                    onChange={updateSignupData}
                  />
                  <input
                    className="input-group m-2 "
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    onChange={updateSignupData}
                  />
                  <input
                    className="input-group m-2 "
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={updateSignupData}
                  />

                  <div className="input-group m-2 " id="dropdown">
                    <span className="text-muted">User Type</span>
                    <DropdownButton
                      
                      align="end"
                      title={userType}
                      variant="success"
                      className="mx-2"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="ENGINEER">
                        ENGINEER
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="d-flex">
                  <div
                    className="text-center text-warning"
                    onClick={() => toggleSignUp()}
                  >
                  <button className="btn  justify-content-center " id="loginbtn2" >
                    Login 
                  </button>
                  </div>
                   <button className="btn  justify-content-center " id="signupbtn2">
                    Signup
                   </button>
                  </div>
                  <div className="text-danger text-center">{message}</div>
                </form>
              </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
