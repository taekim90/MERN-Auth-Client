import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate } from 'react-router-dom'

export default function Register({ currentUser, setCurrentUser }) {
    const [form, setForm] = useState({
        email:'',
        password: '',
        name: '',
        // verifyPassword: ''
    })

    // const [newForm, setNewForm] = useState({
    //     verifyPassword: ''
    // })

    const [message, setMessage] = useState('')

    const handleFormSubmit = async e => {
        e.preventDefault()
    
    //     // WRAP THE IF AROUND THE TRY 
    //     // if (form.password === newForm.verifyPassword) {
    //     if (form.password === form.verifyPassword) {
    //         try {
    //             //remove unneeded data in the form pre-request
    //             delete form.verifyPassword
    //             // post to our backend using our form data to login
    //             const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, form)
    //             console.log(response)
    //             // decode the token that is sent to us
    //             const { token } = response.data
    //             console.log(token)
    //             // instead of using jsonwebtoken package and doing jwt.decode(token), we are now using jwt_decode
    //             const decoded = jwt_decode(token) // in backend we had to verify. we don't need to do that here
    //             console.log(decoded)
    //             // save the token in localstorage
    //             localStorage.setItem('jwt', token)
    //             // set the app state to the logged in user
    //             setCurrentUser(decoded)
    //         } catch (err) {
    //             // handle errors such as wrong credentials
    //             // console.log(err)
    //             if (err.response.status === 409) {
    //                 console.log(err.response.data)
    //                 setMessage(err.response.data.msg) // this msg is coming from backend users.js
    //             }
    //         }
    //     } else {
    //         setMessage('Password Does Not Match!')
    //     }
    // }

    // OR WRAP THE TRY AROUND THE IF
        try {
            if (form.password === form.verifyPassword) {
                // remove unneeded data in the form pre-request
                delete form.verifyPassword // this isn't necessary but will minimize data being sent to the server
                // post to our backend using our form data to login
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, form)
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
            } else {
                setMessage('Password Does Not Match!')
            }
        } catch (err) {
            // handle errors such as wrong credentials
            // console.log(err)
            if (err.response.status === 409) {
                console.log(err.response.data)
                setMessage(err.response.data.msg) // this msg is coming from backend users.js
            }
        }
    }

    // navigate to the user's profile if currentUser is not null
    if (currentUser) return <Navigate to='/profile' />

    return (
        <div>
            <h3>Register Form:</h3>
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
                    placeholder='enter a password'
                    onChange={e => setForm({...form, password: e.target.value})}
                    value={form.password}
                />

                {/* <label htmlFor='verifyPassword'>Verify Password:</label>
                <input
                    id='verifyPassword'
                    type='verifyPassword'
                    onChange={e => setNewForm({...newForm, verifyPassword: e.target.value})}
                    value={newForm.verifyPassword}
                /> */}

                <label htmlFor='verifyPassword'>Verify Password:</label>
                <input
                    id='verifyPassword'
                    type='password'
                    placeholder='verify your password'
                    onChange={e => setForm({...form, verifyPassword: e.target.value})}
                    value={form.verifyPassword}
                />

                <label htmlFor='name'>Name:</label>
                <input
                    id='name'
                    type='name'
                    placeholder='enter your name'
                    onChange={e => setForm({...form, name: e.target.value})}
                    value={form.name}
                />

                <input type='submit' />
            </form>
        </div>
    )
} 