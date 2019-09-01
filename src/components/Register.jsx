import React, {Component} from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import './Register.css'

import {register} from './userFucntion'

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            username: e.target.username,
            email: e.target.email,
            password: e.target.password
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        register(user).then(res => {
            if (res) {
                this.props.history.push('/login')
            }
        })

    }
    render() {
        return (
            <Container>
                <h3>Register To Be Member of Our Library</h3>
                <Form>
                    <Form.Group controlId="text">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your Name" value={this.state.username} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
                <footer id="footer">
                    Created with ❤ by <b>Nursyahid</b> Powered by <a href="http://www.arkademy.com" target="_blank" rel="noopener noreferrer">Arkademy</a> @2019
                </footer>
            </Container>
        )
    }
}