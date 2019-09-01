import axios from 'axios'

export const register = newUser => {
    return axios
    .post('http://localhost:8000/auth/register', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log("Registered")
    }) 
}

export const login = user => {
    return axios
    .post('http://localhost:8000/auth/login', {
        username: user.username,
        password: user.password
    })
    .then( res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}