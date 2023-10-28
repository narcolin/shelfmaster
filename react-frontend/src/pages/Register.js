import React from 'react'
// import { useRef, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import CredentialInput from '../components/CredentialInput';
import LoginDivider from '../components/LoginDivider';
import SubmitCredentials from '../components/SubmitCredentials';
import AlternativeLogins from '../components/AlternativeLogins';


// // start with letter; only letters, numbers, -, and _; 4-20 characters
// const USER_REG_EX = /^[a-ZA-Z][a-ZA-z0-9-_]{3,19}$/;
// // at least one upper case, number, and special character each; at least 8 characters
// const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const Register = () => {
  // const userRef = useRef();
  // const errRef = useRef();

  // const [user, setUser] = useState('');
  // const [validName, setValidName] = useState(false);
  // const [userFocus, setUserFocus] = useState(false);

  // const [pwd, setPwd] = useState('');
  // const [validPwd, setValidPwd] = useState(false);
  // const [pwdFocus, setPwdFocus] = useState(false);

  // const [matchPwd, setMatchPwd] = useState('');
  // const [validMatch, setValidMatch] = useState(false);
  // const [matchFocus, setMatchFocus] = useState(false);

  // const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])
  
  // useEffect(() => {
  //   setValidName(USER_REG_EX.test(user))
  // }, [user])

  // useEffect(() => {
  //   setValidPwd(PWD_REGEX.test(pwd))
  //   const match = pwd === matchPwd;
  //   setValidMatch(match)
  // }, [pwd, matchPwd])

  // useEffect(() => {
  //   setErrMsg('');
  // }, [user, pwd, matchPwd])
  
  
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form-register">
            <span className="login100-form-title p-b-43">Welcome!</span>
            <CredentialInput type="text" name="email" label="Email" styles="mb-3" />
            <CredentialInput type="password" name="pass" label="Password" />
            <CredentialInput type="password" name="pass" label="Confirm Password" />
            <SubmitCredentials label="Register" />
            <div className="inline">
              <p className="inline-text">Already registered? </p>
              <Link to="/login" className="txt1 inline-link">Login here!</Link>
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

export default Register