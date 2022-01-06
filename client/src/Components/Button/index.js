import React from 'react'
import propTypes from "prop-types";
import './button.scss'


function Button({type,text,loading,...rest}) {
    return (
        <div>
            <button 
                type={type ? type : 'button'}  
                {...rest}
            >{text}
            {loading == true && <i class="fas fa-circle-notch fa-spin"></i> } 
            
            </button>
        </div>
    )
}

Button.propTypes = {
    type : propTypes.string,
    text : propTypes.string,
}

export default Button
