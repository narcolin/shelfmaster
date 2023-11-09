import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../Client";
import LoginDivider from "../components/LoginDivider";
import SubmitCredentials from "../components/SubmitCredentials";
import AlternativeLogins from "../components/AlternativeLogins";

function Login() {
  let navigate = useNavigate();

  const emailRef = useRef();

  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");
  const [hidePwd, setHidePwd] = useState(true);

  const [errMsg, setErrMsg] = useState("");

  // set focus on email input
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pwd,
      });
      if (error) throw error;
      navigate("/inventory");
    } catch (error) {
      switch (error.message) {
        case "Invalid login credentials":
          emailRef.current.focus();
          setErrMsg("Invalid login credentials.");
          break;
        default:
          emailRef.current.focus();
          setErrMsg("Something went wrong!");
          break;
      }
    }
    setEmail("");
    setPwd("");
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form">
            <form onSubmit={(e) => handleSubmit(e)}>
              {/* failure/success message */}
              <div
                className={`alert alert-danger d-flex align-items-center ${
                  errMsg ? "visible-true" : "visible-false"
                }`}
              >
                <i className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" />
                <div>{errMsg}</div>
              </div>
              {/* header */}
              <span className="login100-form-title p-b-43">
                Login to continue
              </span>

              {/* email */}
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
                  }}
                  value={email}
                  required
                />
                <span className="focus-input100"></span>
                <span htmlFor="email" className="label-input100">
                  Email
                </span>
              </div>

              {/* password */}
              <div className="wrap-input100 password-container">
                <input
                  className={`input100 ${pwd ? "has-val" : ""}`}
                  type={hidePwd ? "password" : "text"}
                  id="password"
                  onChange={(e) => {
                    setPwd(e.target.value);
                    setErrMsg("");
                  }}
                  value={pwd}
                  required
                />
                <span className="focus-input100"></span>
                <span htmlFor="password" className="label-input100">
                  Password
                </span>
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
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                  />
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
                <Link to="/register" className="txt1 inline-link">
                  Register here!
                </Link>
              </div>
              <p>Demo login: dennisphun321@gmail.com Abcd123!</p>
            </form>
            <LoginDivider />
            <AlternativeLogins />
          </div>
          <div className="login100-bg" />
        </div>
      </div>
    </div>
  );
}

export default Login;
