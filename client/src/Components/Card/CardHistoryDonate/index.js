import React from 'react'
import Button from '../../Button';
import './cardhistory.scss'

function CardHistoryDonate({title, date, amount, status}) {
    const convertDate = (date) =>{
        const dateObject = new Date(date)
        const dateFormat = dateObject.toLocaleString('en-GB', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        return dateFormat;
    }
    
    return (
        <div className="card-history-donation">
            <h4>{title}</h4>
            <p className="date">{convertDate(date)}</p>
            <p className="total">Total : Rp. {amount}</p>
            <Button className={`btn btn-custome ${status === 'pending' ? 'btn-red' : 'btn-green'}`} text={`${status === 'pending' ? 'pending' : 'Finished'}`} />
        </div>
    )
}

export default CardHistoryDonate
