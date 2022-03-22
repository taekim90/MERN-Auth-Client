import { useState, useEffect } from "react"
import axios from 'axios'

export default function Profile({ currentUser }) {
    const [message, setMessage] = useState('')

    // use useEffect to get data from the back
    useEffect(() => {
        (async () => {
            try {
                // need to get token from local storage
                const token = localStorage.getItem('jwt')
                console.log('token', token)

                // then make the auth headers
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }

                // then hit the auth locked endpoint
                    // axios.get(url, options)
                    // axios.post(url, body, options)
                    // axios.put(url, body, options)
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
                // set the data from the server in state
                setMessage(response.data.msg)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])
    
    return (
        <div>
            <h3>{currentUser.name}'s Profile</h3>
            <p>Your Email is {currentUser.email}</p>

            <h4>The message from the auth locked route is:</h4>
            <h6>{message}</h6>
        </div>
    )
} 