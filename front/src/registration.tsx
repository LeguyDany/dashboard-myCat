// =================== React imports ===================
import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";


// =================== css imports ===================
import "./registration.css";


// =================== Imports of images and svg ===================
import registerImage from "./assets/other/registerImage.jpg";
import logoWhite from './assets/other/LogoWhite.svg';
import logoGithub from './assets/icons/githubLogo.svg';
import logoTwitter from './assets/icons/twitterLogo.svg';



// =================== Components ===================

export function Login () {
    /* Displays the screen used to log onto the user's account. */
    return(
        <section className="registration">
            <img src={registerImage} />
            <article>
                <div>
                    <div>
                        <img src={logoWhite}/>
                    </div>
                    <form>
                        <legend>Login</legend>
                        <div>
                            <div>
                                <label htmlFor="userName">Username</label>
                                <input type="text" name="userName" id="userName" placeholder="Enter username"/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="Enter password"/>
                            </div>
                        </div>

                        <input type="submit" value="Sign in"/>

                        <a href="/register">Not account? Click here to sign in.</a>
                    </form>
                    <p>or</p>
                    <div className="loginWith">
                        <a className="github oauth2" href="/">
                            <img src={logoGithub} alt="Github's logo"/>
                            Log in with GitHub
                        </a>
                        <a className="twitter oauth2" href="/">
                            <img src={logoTwitter} alt="Twitter's logo"/>
                            Log in with twitter
                        </a>
                    </div>

                </div>
            </article>
        </section>
    )
}

export function Register() {
    return(
        <section className="registration">
            <img src={registerImage} />
            <article>
                <div>
                    <div>
                        <img src={logoWhite}/>
                    </div>
                    <form>
                        <legend>Register</legend>
                        <div>
                            <div>
                                <label htmlFor="userName">Username</label>
                                <input type="text" name="userName" id="userName" placeholder="Enter username" required/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="Enter password" required/>
                            </div>
                            <div>
                                <label htmlFor="email">Email address</label>
                                <input type="email" name="email" id="email" placeholder="Enter your email address" required/>
                            </div>
                        </div>

                        <input type="submit" value="Sign up"/>
                        <a href="/login">Come back to login page</a>
                    </form>

                </div>
            </article>
        </section>
    )
}