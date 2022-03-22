import { useState } from 'react'
import axios from 'axios' // to connect with the backend we need axios
// import jwt from 'jsonwebtoken' // to be able to decode - wasn't working??
import jwt_decode from 'jwt-decode' // installed npm i jwt-decode instead
import { Navigate } from 'react-router-dom'

export default function Login({ currentUser, setCurrentUser }) {
    const [form, setForm] = useState({
        email:'',
        password: '',
    })

    const [message, setMessage] = useState('')

    const handleFormSubmit = async e => {
        e.preventDefault()
        try {
            // post to our backend using our form data to login
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, form)
            console.log(response)
            // decode the token that is sent to us
            const { token } = response.data
            console.log(token)
            // instead of using jsonwebtoken package and doing jwt.decode(token), we are now using jwt_decode
            const decoded = jwt_decode(token) // in backend we had to verify. we don't need to do that here
            console.log(decoded)
            // save the token in localstorage
            localStorage.setItem('jwt', token)
            // set the app state to the logged in user
            setCurrentUser(decoded)
        } catch (err) {
            // handle errors such as wrong credentials
            // console.log(err)
            if (err.response.status === 400) {
                console.log(err.response.data)
                setMessage(err.response.data.msg) // this msg is coming from backend users.js
            }
        }
    }

    // navigate to the user's profile if currentUser is not null
    if (currentUser) return <Navigate to='/profile' />

    return (
        <div>
            <h3>Login Form:</h3>
            <p>{message ? `the server has a message for you: ${message}` : ''}</p>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    type='email'
                    placeholder='user@domain.com'
                    onChange={e => setForm({...form, email: e.target.value})}
                    value={form.email}
                />

                <label htmlFor='password'>Password:</label>
                <input
                    id='password'
                    type='password'
                    onChange={e => setForm({...form, password: e.target.value})}
                    value={form.password}
                />

                <input type='submit' />
            </form>
        </div>
    )
} 