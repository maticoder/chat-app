import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Chat.scss';

import io from 'socket.io-client';
const socket = io('http://localhost:7000');
// const socket = io('http://192.168.1.170:7000');
socket.disconnect();

// dodac ladowanie przez jedna sekunde i gdy dlugosc messages jest rowna zero

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: false,
            user: '',
            message: '',
            messages: [],
        }

        this.sendRef = React.createRef();
        this.messagesRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: true
            })
        }, 2000);

        this.setState({
            user: this.props.user
        })

        // get chat message
        socket.on('chat-message', message => {
            if(socket.connected === true) {
                this.appendMessage(message);
            }
        });

        // get new user which connected
        socket.on('user-connected', name => {
            this.appendMessage(`${name} dołączył`);
        })

        // get all messages
        socket.on('data', data => {
            for(let i = 0; i < data.length; i++) {
                this.appendMessage(`${data[i].message}`);
            }
            // and login new user
            socket.emit('new-user', this.state.user);
        });

        socket.on('user-disconnected', name => {
            this.appendMessage(`${name} odszedł`);
        });

        // connect new user
        socket.connect();

        // call for all messages
        socket.emit('get-messages');
    }

    componentDidUpdate() {
        this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
    }

    // add new message to server
    addMessage = (message) => {
        // append message to div
        socket.emit('send-chat-message', message);
    }

    // add new message to array with messages
    appendMessage = (message) => {
        // append message to div
        this.setState({
            messages: this.state.messages.concat(message)
        });
    }

    // change the textarea where user can provide message
    onTextAreaChange = (e) => {
        this.setState({
            message: e.target.value
        });
    }

    // send messeage using enter key
    onKeyDown = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault();
            this.addMessage(this.state.message);
            this.setState({
                message: ''
            });
        }
    }

    // send message using button
    onSendClick = (e) => {
        this.addMessage(this.state.message);
        this.setState({
            message: ''
        });
    }

    // logout and disconenct user
    onQuitClick = (e) => {
        this.setState({
            messages: [],
            user: ''
        });

        // disconnect user
        socket.disconnect();
    }

    render() {
        return (
            <div className="chat text-center">
                <div ref={this.messagesRef} className="messages card">
                    { this.state.data && this.state.messages.map((message, index) => {
                        return <div key={index} className="chat-message">
                            {message}
                        </div>
                    })}
                </div>
                <textarea ref={this.sendRef} onKeyDown={this.onKeyDown} value={this.state.message} onChange={this.onTextAreaChange} className="message form-control text-center" />
                <button onClick={this.onSendClick} type="button" className={'button button-send'}>
                    <span className="button-text">Wyślij</span>
                </button>
                <Link to="/login">
                    <button onClick={this.onQuitClick} type="button" className={'button button-chat'}>
                        <span className="button-text">Wyjdź</span>
                    </button>
                </Link>
                { !this.state.data && <div>
                        <div className="loader"></div>
                        <p className="loading">Ladowanie...</p>
                    </div> }
            </div>
        )
    }
}

export default Chat;