import React, { Fragment } from 'react';
import '../Signin/Signin.css'

function Register({ onRouteChange }) {
    return (
        <Fragment>
            <div>
                <article class="pa4 black-80">
                    <div action="sign-up_submit" method="get" acceptCharset="utf-8">
                        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                            <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
                            <div class="mt3">
                                <label class="db fw4 lh-copy f6" htmlFor="name">Name</label>
                                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name" id="name" />
                            </div>
                            <div class="mt3">
                                <label class="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address" id="email-address" />
                            </div>
                            <div class="mt3">
                                <label class="db fw4 lh-copy f6" htmlFor="password">Password</label>
                                <input class="b pa2 input-reset ba bg-transparent" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div class="mt3"><input onClick={() => onRouteChange('home')} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Register" /></div>
                    </div>
                </article>
            </div>
        </Fragment>
    );
}

export default Register;