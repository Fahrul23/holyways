import React from 'react'
import Button from '../../Button';
import './cardhistory.scss'

function CardHistoryDonate() {
    return (
        <div className="card-history-donation">
            <h4>The Strength of a People. Power of Community</h4>
            <p className="date">Saturday, <span>12 April 2021</span></p>
            <p className="total">Total : Rp 45.000</p>
            <Button className="btn btn-custome btn-green" text="Finished" />
        </div>
    )
}

export default CardHistoryDonate
