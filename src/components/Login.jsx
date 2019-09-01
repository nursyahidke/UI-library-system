import React, {Component} from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import {login} from './userFucntion'
import './Login.css'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            username: e.target.username,
            password: e.target.password
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                this.props.history.push('/')
            }
        })

    }
    render() {
        return (
            <>
            <Container>
                <h3>Login to Our Library</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="text">
                        <Form.Label>Username or Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={this.state.username} onChange={this.onChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign In
                    </Button>
                </Form>

            </Container>
            <footer id="footer">
                Created with ❤ by <b>Nursyahid</b> Powered by <a href="http://www.arkademy.com" target="_blank" rel="noopener noreferrer">Arkademy</a> @2019
            </footer>
            </>
        )
    }
}