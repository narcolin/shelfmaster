import { Link } from "react-router-dom";
import "./css/login.css";

function Login() {  
  // get input elements (e.g. email, password)
  const inputElements = document.querySelectorAll(".input100");
  // listener for input elements
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      handleInputChange(inputElement);
    });
  });
  // adds/removes class if has value
  function handleInputChange(inputElement) {
    if (inputElement.value.trim() !== "") {
      inputElement.classList.add("has-val");
      console.log("Value added");
    } else {
      inputElement.classList.remove("has-val");
      console.log("Value removed");
    }
  }
  
  // listener for hiding/showing password
  document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("floatingPassword");
    const showPasswordIcon = document.getElementById("showPasswordIcon");
  
    showPasswordIcon.addEventListener("click", function () {
      if (passwordField.type === "password") {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    });
  });

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form">
            <span className="login100-form-title p-b-43">
              Login to continue
            </span>

            <div className="wrap-input100 mb-3">
              <input className="input100" type="text" name="email"/>
              <span className="focus-input100"></span>
              <span className="label-input100">Email</span>
            </div>
            
            
            <div className="wrap-input100 password-container">
              <input className="input100" type="password" name="pass" />
              <span className="focus-input100"></span>
              <span className="label-input100">Password</span>
              <div className="password-toggle">
                  <i id="showPasswordIcon" className="bi bi-eye"></i>
                </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="contact100-form-checkbox">
                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                <label className="label-checkbox100" for="ckb1">
                  Remember me
                </label>
              </div>

              <div>
                <Link to="/register" className="txt1">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">
                Login
              </button>
            </div>

            <div className="inline">
              <p className="inline-text">New user? </p>
              <Link to="/register" className="txt1 inline-link">Register here!</Link>
            </div>
            
            <div className="divider d-flex align-items-center mt-4 mb-3">
              <p className="text-center fw-bold mx-4 mb-0 text-muted">OR LOGIN WITH</p>
            </div>
            
            <div className="d-flex flex-row align-items-center justify-content-center">
              <button type="button" className="btn btn-floating google mx-1">
                <i className="bi bi-google"></i>
              </button>
              <button type="button" className="btn btn-floating facebook mx-1">
                <i className="bi bi-facebook"></i>
              </button>
              <button type="button" className="btn btn-floating twitter mx-1">
                <i className="bi bi-twitter"></i>
              </button>
            </div>
          </form>

          <div className="login100-bg" />
        </div>
      </div>
    </div>
   )
  }
	
	

	
export default Login;