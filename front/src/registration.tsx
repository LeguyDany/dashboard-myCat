// =============================================== Imports ===============================================
// --------------------------- General ---------------------------
import React, { FunctionComponent as FC, useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./registration.css";

// --------------------------- images / svg ---------------------------
import registerImage from "./assets/other/registerImage.jpg";
import logoWhite from "./assets/other/LogoWhite.svg";
import logoGithub from "./assets/icons/githubLogo.svg";
import logoTwitter from "./assets/icons/twitterLogo.svg";

// =============================================== Components ===============================================
// --------------------------- Login ---------------------------
export function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    /* Checks if the user is already logged in. */
    useEffect(() => {
      if (localStorage.getItem("user-info")) {
        navigate("/dashboard");
      }
  }, [])

  /* Sends the login information to the backend. */
  function login() {
    let item = { username, password };
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/dashboard");
      });
  }
  return (
    <section className="registration">
      <img src={registerImage} alt="Register" />
      <article>
        <div>
          <div>
            <img src={logoWhite} alt="Logo" />
          </div>

          <form>
            <legend>Login</legend>
            <div>
              <div>
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button onClick={login} type="button" id="submit">
              Sign In
            </button>

            <a href="/register">
              Don't have an account? Click here to sign up.
            </a>
          </form>
          <p>or</p>
          <div className="loginWith">
            <a className="github oauth2" href="/">
              <img src={logoGithub} alt="Github's logo" />
              Log in with GitHub
            </a>
            <a className="twitter oauth2" href="/">
              <img src={logoTwitter} alt="Twitter's logo" />
              Log in with twitter
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}

// --------------------------- Registration ---------------------------
export function Register() {
  /* Component used for signing up. Sends a POST request to our API, and adds a new user. */

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* Function used to send a POST request to our API. */
  async function register() {
    let item = { username, password };
    let result = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        },
        body: JSON.stringify(item),
      })
      result = await result.json();
      localStorage.setItem("user-info", JSON.stringify(result));
  }

  return (
    <section className="registration">
      <img src={registerImage} alt="Register" />
      <article>
        <div>
          <div>
            <img src={logoWhite} alt="Logo" />
          </div>
          <form>
            <legend>Register</legend>
            <div>
              <div>
                <label htmlFor="userName">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="button" id="submit" onClick={register}>
              Sign Up
            </button>
            <a href="/login">Come back to login page</a>
          </form>
        </div>
      </article>
    </section>
  );
}

export function Logout() {
  /* Component used for logging out. Removes the user from local storage. */
  localStorage.removeItem("user-info");
  console.log("Logged out");
  return <Navigate to="/login" />;
}
