import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../Client";
import axios from "axios";
import LoginDivider from "../components/LoginDivider";
import SubmitCredentials from "../components/SubmitCredentials";
import AlternativeLogins from "../components/AlternativeLogins";

// at least one upper case, number, and special character each; at least 8 characters
const PWD_REGEX = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*)(+-]).{8,}$/;

const Register = () => {
  const emailRef = useRef();

  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // set focus on email input
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // check valid and match password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // on register clicked, attempt to signup
  async function handleSubmit(e) {
    e.preventDefault();
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      setErrMsg("Invalid entry.");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: pwd,
        options: {
          emailRedirectTo: "http://localhost:3000",
        },
      });
      if (error) throw error;
      if (data.user.identities.length === 0)
        setErrMsg("User already registered.");
      // TODO: add redirect to success page saying check email for verification
      else {
        // Add user to database, assume this is successful. Potential
        // duplicate garbage data that we should find a way to clean
        /* eslint-disable no-unused-vars */
        const response = await axios.post("http://localhost:8000/users", {
          _id: data.user.id,
        });
        /* eslint-enable no-unused-vars */
        // console.log(response);
        setSuccess(true);
      }
    } catch (error) {
      switch (error.message) {
        case "User already registered":
          setErrMsg("User already registered.");
          break;
        default:
          setErrMsg("Something went wrong!");
          break;
      }
    }
    setEmail("");
    setPwd("");
    setMatchPwd("");
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form-register"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* failure/success message */}
            <div
              className={`alert ${
                errMsg ? "alert-danger" : "alert-success"
              } d-flex align-items-center ${
                errMsg || success ? "visible-true" : "visible-false"
              }`}
            >
              {success ? (
                <>
                  <i className="bi bi-check-circle-fill flex-shrink-0 me-2" />
                  <div>Check your email for confirmation.</div>
                </>
              ) : (
                <>
                  <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" />
                  <div>{errMsg}</div>
                </>
              )}
            </div>

            <span className="login100-form-title p-b-43">Welcome!</span>
            <div className="wrap-input100 mb-3 email-container">
              <input
                className={`input100 ${email ? "has-val" : ""}`}
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrMsg("");
                  setSuccess(false);
                }}
                value={email}
                required="required"
              />
              <span className="focus-input100" />
              <span className="label-input100">Email</span>
            </div>

            <div className="wrap-input100 mb-3 password-container">
              <input
                className={`input100 ${pwd ? "has-val" : ""}`}
                type="password"
                id="password"
                onChange={(e) => {
                  setPwd(e.target.value);
                  setErrMsg("");
                  setSuccess(false);
                }}
                value={pwd}
                required="required"
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
              className={`mb-3 ${
                (pwd && !validPwd) || (pwdFocus && !validPwd)
                  ? "instructions"
                  : "offscreen"
              }`}
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
              />
              <span className="focus-input100" />
              <span htmlFor="confirm_pwd" className="label-input100">
                Confirm Password
              </span>
            </div>
            <p
              id="confirmnote"
              className={`mb-3 ${!validMatch ? "instructions" : "offscreen"}`}
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

            <LoginDivider />
            <AlternativeLogins />
          </form>
          <div className="login100-bg" />
        </div>
      </div>
    </div>
  );
};

export default Register;
