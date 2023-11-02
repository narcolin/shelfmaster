import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CredentialInput from "../components/CredentialInput";
import LoginDivider from "../components/LoginDivider";
import SubmitCredentials from "../components/SubmitCredentials";
import AlternativeLogins from "../components/AlternativeLogins";

// at least one upper case, number, and special character each; at least 8 characters
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*)(+-]).{8,}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form-register" onSubmit={handleSubmit}>

            {/* failed reguster */}
            <div className={`alert alert-danger d-flex align-items-center ${errMsg ? 'visible-true' : 'visible-false'}`}>
              <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"/>
              <div>Invalid email and password!</div>
            </div>

            <span className="login100-form-title p-b-43">Welcome!</span>
            <div className="wrap-input100 mb-3 email-container">
              <input
                className={`input100 ${email ? "has-val" : ""}`}
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required="required"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <span className="focus-input100" />
              <span className="label-input100">Email</span>
            </div>

            <div className="wrap-input100 mb-3 password-container">
              <input
                className={`input100 ${pwd ? "has-val" : ""}`}
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required="required"
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <span className="focus-input100"></span>
              <span htmlFor="password" className="label-input100">
                Password
              </span>
            </div>
            <p
              id="pwdnote"
              className={
                (pwd && !validPwd) || (pwdFocus && !validPwd)
                  ? "instructions"
                  : "offscreen"
              }
            >
              At least 8 characters.
              <br />
              Must include a uppercase letter, a number and a special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>{" "}
              <span aria-label="caret">^</span>{" "}
              <span aria-label="ampersand">&</span>{" "}
              <span aria-label="asterisk">*</span>{" "}
              <span aria-label="question mark">?</span>{" "}
              <span aria-label="opening parenthesis">(</span>{" "}
              <span aria-label="closing parenthesis">)</span>{" "}
              <span aria-label="plus sign">+</span>{" "}
              <span aria-label="hyphen">-</span>
            </p>

            <div className="wrap-input100 mb-3 password-container">
              <input
                className={`input100 ${matchPwd ? "has-val" : ""}`}
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <span className="focus-input100" />
              <span htmlFor="confirm_pwd" className="label-input100">
                Confirm Password
              </span>
            </div>
            <p
              id="confirmnote"
              className={!validMatch ? "instructions" : "offscreen"}
            >
              Must match the first password input field.
            </p>

            <SubmitCredentials label="Register" />
            <div className="inline">
              <p className="inline-text">Already registered? </p>
              <Link to="/login" className="txt1 inline-link">
                Login here!
              </Link>
            </div>

            <LoginDivider/>
            <AlternativeLogins/>

          </form>
          <div className="login100-bg" />
        </div>
      </div>
    </div>
  );
};

export default Register;
