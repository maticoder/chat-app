import React, { Component } from 'react';

import Login from './Login';
import Chat from './Chat';

import './App.scss';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            messages: []
        }
    }

    loginUser = (user) => {
        this.setState({
            user: user
        })
    }

    render() {
        return (
            <Router>
                <Route render={( {location} ) => (
                    <TransitionGroup>
                        <CSSTransition
                            key={location.key}
                            timeout={300}
                            classNames="fade"    
                        >
                            <Switch location={location}>
                                <Route exact={true} path="/" render={() =>
                                    <Redirect to="/login" />} />
                                <Route path="/login" component={() =>                     
                                    <Login
                                        user={this.state.user}
                                        loginUser={this.loginUser} />} />
                                <Route path="/chat" component={() => 
                                    <Chat
                                        user={this.state.user} />} />
                                <Route render={() => <div>Not Found</div>} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
            </Router>
        )
    }
}

export default App;