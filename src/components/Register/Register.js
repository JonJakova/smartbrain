import React, { Fragment } from 'react';

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
                        password: this.setState.password,
                        name: this.state.name
                    }
                )
            })
            .then(resp => resp.json())
            .then(user => {
                if (user) {
                    this.props.updateUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <Fragment>
                <div>
                    <article class="pa4 black-80">
                        <div action="sign-up_submit" method="get" acceptCharset="utf-8">
                            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                                <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
                                <div class="mt3">
                                    <label class="db fw4 lh-copy f6" htmlFor="name">Name</label>
                                    <input
                                        class="pa2 input-reset ba bg-transparent w-100 measure"
                                        type="text" name="name" id="name"
                                        onChange={this.onNameChange}
                                    />
                                </div>
                                <div class="mt3">
                                    <label class="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                                    <input
                                        class="pa2 input-reset ba bg-transparent w-100 measure"
                                        type="email" name="email-address" id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                <div class="mt3">
                                    <label class="db fw4 lh-copy f6" htmlFor="password">Password</label>
                                    <input
                                        class="b pa2 input-reset ba bg-transparent"
                                        type="password" name="password" id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div class="mt3"><input onClick={this.onSubmitChange} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Register" /></div>
                        </div>
                    </article>
                </div>
            </Fragment>
        );
    }
}

export default Register;