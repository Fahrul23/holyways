import React, {useContext, useEffect, useState} from 'react'

import Navbar from '../../Components/Navbar';
import './profile.scss';
import profileImg from '../../assets/image/profile.png'
import CardHistoryDonate from '../../Components/Card/CardHistoryDonate';
import { UserContext } from '../../context/UserContext';
import { API } from '../../config/api';

const Profile = () => {
    const [state] = useContext(UserContext)
    const [listHistoryDonate, setListHistoryDonate] = useState([])
    const getHistoryDonates = async () => {
        try {
            let response = await API.get('/donates')
            setListHistoryDonate(response.data.data)
            console.log("state user", state)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getHistoryDonates()
    },[])
    
    return (
        <div>
            <Navbar />
            <div className="profile">
                <div className="profile-wrapper">
                    <h2>My Profile</h2>
                    <div className="profile-info">
                        <div className="profile-img">
                            <img src={profileImg} alt="profile" />
                        </div>
                        <div className="profile-item">
                            <div className="item">
                                <p className="label">Full Name</p>
                                <p className="text">{state.name}</p>
                            </div>
                            <div className="item">
                                <p className="label">Email</p>
                                <p className="text">{state.email}</p>
                            </div>
                            <div className="item">
                                <p className="label">Phone</p>
                                <p className="text">08967577689</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="history">
                    <h2>History Donation</h2>
                    {listHistoryDonate && listHistoryDonate.map(donate =>{
                        return (
                            <CardHistoryDonate
                                key={donate.id} 
                                title={donate.title}
                                date={donate.date}
                                amount={donate.amount}
                                status={donate.status}
                            />
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
