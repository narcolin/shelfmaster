import { Link } from "react-router-dom";
import { useRef, useState, useEffect} from 'react';
import "./css/login.css";
import CredentialInput from '../components/CredentialInput';
import LoginDivider from '../components/LoginDivider';
import SubmitCredentials from '../components/SubmitCredentials';
import AlternativeLogins from '../components/AlternativeLogins';

function Login() {  
  const emailRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [hidePwd, setHidePwd] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // set focus on email input
  useEffect(() => {
      emailRef.current.focus();
  }, [])

  // on edit of user/pwd, clears error message
  useEffect(() => {
      setErrMsg('');
  }, [email, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pwd);
    setSuccess(true);
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form" onSubmit={handleSubmit}>
            
            {/* failed login */}
            <div className={`alert alert-danger d-flex align-items-center ${errMsg ? 'visible-true' : 'visible-false'}`}>
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"/>
              <div>Invalid email and password!</div>
            </div>

            {/* header */}
            <span className="login100-form-title p-b-43">
              Login to continue
            </span>
  
            {/* email */}
            <div className="wrap-input100 mb-3 email-container">
              <input
                className={`input100 ${email ? 'has-val' : ''}`}
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <span className="focus-input100"></span>
              <span htmlFor="email" className="label-input100">Email</span>
            </div>

            {/* password */}
            <div className="wrap-input100 password-container">
              <input
                className={`input100 ${pwd ? 'has-val' : ''}`}
                type={hidePwd ? "password" : "text"}
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <span className="focus-input100"></span>
              <span htmlFor="password" className="label-input100">Password</span>
              <div className="password-toggle">
                  <i
                    id="showPasswordIcon"
                    className={hidePwd ? "bi bi-eye" : "bi bi-eye-slash"}
                    onClick={() => setHidePwd(!hidePwd)}
                  />
                </div>
            </div>
            
            {/* remember me and forgot password */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="contact100-form-checkbox">
                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>

              <div>
                <Link to="/register" className="txt1">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <SubmitCredentials label="Login" />

            <div className="inline">
              <p className="inline-text">New user? </p>
              <Link to="/register" className="txt1 inline-link">Register here!</Link>
            </div>
            
            <LoginDivider/>
            <AlternativeLogins/>
          </form>

          <div className="login100-bg" />
        </div>
      </div>
    </div>
   )
  }
	
	

	
export default Login;