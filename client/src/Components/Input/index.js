import React from 'react';
import propTypes from "prop-types";
import './input.scss';

const Input = ({type, placeholder,...rest}) => {
    return (
        <div className="form-input">
            <input type={type} placeholder={placeholder} {...rest}/>
        </div>
    )
}

Input.propTypes = {
    type : propTypes.string,
    placeholder : propTypes.string
}

export default Input
