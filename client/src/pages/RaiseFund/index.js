import React from 'react'
import Button from '../../Components/Button'
import CardDonate from '../../Components/Card/CardDonate';
import Navbar from '../../Components/Navbar'
import './raisefund.scss';
import {Link} from 'react-router-dom';

function RaiseFund() {
    return (
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="header-wrapper">
                    <h2>My Raise Fund</h2>
                    <Link to="/addraisefund">
                        <Button className="btn btn-medium btn-orange" text="Make Raise Fund" />
                    </Link>
                </div>
                <div className="list-raise-funds"> 
                    <CardDonate
                        title="The Strength of a People Power of Community"
                        description= 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                        price= {25000000}
                        image= 'https://images.unsplash.com/photo-1505155485412-30b3a45080ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=881&q=80'
                        button="View Fund"
                        link="/donatefund"
                     />
                </div>
            </div>
        </div>
    )
}

export default RaiseFund







