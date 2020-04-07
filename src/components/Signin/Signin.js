import React, { Fragment } from 'react';
import './Signin.css'

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSubmitSignin = () => {
        
        fetch('http://localhost:3001/signin',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        email: this.state.email,
                        password: this.state.password
                    }
                )
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.id) {
                    this.props.updateUser(data);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <Fragment>
                <div>
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
                        <main className="pa4 black-80">
                            <div className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                        <input
                                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                            type="email" name="email-address" id="email-address"
                                            onChange={this.onEmailChange}
                                        />
                                    </div>
                                    <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                        <input
                                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                            type="password" name="password" id="password"
                                            onChange={this.onPasswordChange}
                                        />
                                    </div>
                                </fieldset>
                                <div className="">
                                    <input onClick={this.onSubmitSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                                </div>
                                <div className="lh-copy mt3">
                                    <p onClick={() => onRouteChange('register')} className="b br3 f6 link dim black db pointer">Register</p>
                                </div>
                            </div>
                        </main>
                    </article>
                </div>
            </Fragment>
        );
    }
}

export default Signin;