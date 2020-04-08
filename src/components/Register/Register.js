import React, { Fragment } from 'react';
//import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onSubmitChange = () => {
        fetch('http://localhost:3001/register',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        email: this.state.email,
                        password: this.state.password,
                        name: this.state.name
                    }
                )
            })
            .then(resp => resp.json())
            .then(user => {
                if (user.id) {
                    this.props.updateUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        return (
            <Fragment>
                <div>
                    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
                    <main className="pa4 black-80">
                        <div action="sign-up_submit" method="get" acceptCharset="utf-8">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <p className="ph0 mh0 fw6 clip">Sign Up</p>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent w-100 measure impForm"
                                        type="text" name="name" id="name"
                                        onChange={this.onNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent w-100 measure"
                                        type="email" name="email-address" id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent"
                                        type="password" name="password" id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="mt3"><input onClick={this.onSubmitChange} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Register" /></div>
                        </div>
                        </main>
                    </article>
                </div>
            </Fragment>
        );
    }
}

export default Register;