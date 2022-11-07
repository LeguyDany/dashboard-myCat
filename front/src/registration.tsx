import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./registration.css";

// =================== Images and svg ===================
import registerImage from "./assets/other/registerImage.jpg";
import logoWhite from './assets/other/LogoWhite.svg';
import logoGithub from './assets/icons/githubLogo.svg';
import logoTwitter from './assets/icons/twitterLogo.svg';

export function Login () {
    return(
        <section>
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
                                <label htmlFor="userName">User name</label>
                                <input type="text" name="userName" id="userName" placeholder="Enter username"/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="Enter password"/>
                            </div>
                        </div>

                        <input type="submit" />
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

