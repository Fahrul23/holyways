import React from 'react'
import './cardDonate.scss';
import Button from '../../Button';
import propTypes from "prop-types";
import {Link} from 'react-router-dom';

function CardDonate(props) {
    const {title,description,price,image,button,link} = props
    return (
        <div className="card-donate">
            <div className="card-donate-image">
                <img src={`http://localhost:5000/uploads/${image}`} alt="donate" />
            </div>
            <div className="card-title">
                <Link to={link}>
                    <p>{title}</p>
                </Link>
            </div>
            <div className="card-desc">
                <p>{description}</p>
            </div>
            <div className="card-progres">
                <div className="progres-bar">
                    <div className="bar"></div>
                </div>
            </div>
            <div className="card-footer">
                <div className="price">
                    <h4>RP. {price}</h4>
                </div>
                <div className="action">
                    <Button className="btn btn-small btn-orange" text={button} />
                </div>
            </div>
        </div>
    )
}

CardDonate.propTypes = {
    title : propTypes.string,
    description : propTypes.string,
    price : propTypes.number,
    image : propTypes.string,
    button : propTypes.string,

}


export default CardDonate
