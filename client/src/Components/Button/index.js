import React from 'react'
import propTypes from "prop-types";
import './button.scss'


function Button({type,text,...rest}) {
    return (
        <div>
            <button type={type ? type : 'button'}  {...rest} >{text}</button>
        </div>
    )
}

Button.propTypes = {
    type : propTypes.string,
    text : propTypes.string,
}

export default Button
