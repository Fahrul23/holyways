import React from 'react'
import './alert.scss'

const Alert = ({message}) => {
    return (
        <div class="alert">
            <div class="text">
                {message}
            </div>
        </div>
    )
}
export default Alert
