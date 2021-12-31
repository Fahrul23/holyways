import React from 'react'
import './cardStatus.scss'
import propTypes from "prop-types";

const CardStatusDonate = (props) => {
    const {showModal, isButton, name, date, total} = props
    return (
        <div className="donate-card-status">
            <div className="donate-status-item">
                <p className="name">{name}</p>
                <p className="time">Saturday. <span>{date}</span></p>
                <p className="total">Total : Rp {total}</p>
            </div>
            {isButton === true && (
                <div className="donate-action">
                    <button 
                        className="btn btn-small btn-orange" 
                        onClick={() => showModal()}
                        >detail</button>
                </div>
            )}
        </div>
    )
}
CardStatusDonate.propTypes = {
    name : propTypes.string,
    date : propTypes.string,
    total : propTypes.number,
    image : propTypes.string,
    isButton: propTypes.bool,
    showModal: propTypes.func
}

export default CardStatusDonate