import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button'
import CardDonate from '../../Components/Card/CardDonate';
import Navbar from '../../Components/Navbar'
import './raisefund.scss';
import {Link} from 'react-router-dom';
import { API } from '../../config/api';

function RaiseFund() {
    const [dataFund, setDataFund] = useState([])
    
    const config = {
        Headers: {
            "Content-type" : "aplication/json"
        }
    }
    
    useEffect(() => {
        getFunds()
    }, [])

    const getFunds = async () => {
        let response = await API.get('funds', config)
        setDataFund(response.data.data.funds)
    }
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
                    {dataFund && 
                        dataFund.map((data,index) => {
                                return (
                                    <CardDonate 
                                        key={index}
                                        title={data.title}
                                        description={data.description}
                                        price={data.goal}
                                        image={data.thumbnail}
                                        button="View Fund"
                                        link={`/donatefund/${data.id}`}
                                    />
                                )
                            })
                        }
                </div>
            </div>
        </div>
    )
}

export default RaiseFund







