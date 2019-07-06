import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user
        }

        this.button = React.createRef();
    }

    // change input where user can write nick
    onUserInputChange = (e) => {
        this.setState({
            user: e.target.value
        });
    }

    // login the user using enter key
    onKeyDown = (e) => {
        if(e.keyCode === 13) {
            this.button.current.click();
        }
    }

    // login the user using button
    onLoginClick = (e) => {
        this.props.loginUser(this.state.user);
    }

    render() {
        return (
            <div className={'login text-center'}>
                <div className="content">
                    <h1 className="display-4">Chat</h1>
                    <p className="lead">Zaloguj się.</p>
                    <hr className="my-4" />
                    <input value={this.state.user} onChange={this.onUserInputChange} onKeyDown={this.onKeyDown} className="nick form-control text-center" type="text" />
                    <br />
                    <Link to="/chat">
                        <button ref={this.button} onClick={this.onLoginClick} type="button" className={'button button-login'}>
                            <span className="button-text">Wejdź</span>
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Login;