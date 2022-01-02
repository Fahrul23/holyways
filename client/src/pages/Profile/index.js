import React, {useContext} from 'react'

import Navbar from '../../Components/Navbar';
import './profile.scss';
import profileImg from '../../assets/image/profile.png'
import CardHistoryDonate from '../../Components/Card/CardHistoryDonate';
import { UserContext } from '../../context/UserContext';

const Profile = () => {
    const [state] = useContext(UserContext)
    
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
                                <p className="text">{state.user.name}</p>
                            </div>
                            <div className="item">
                                <p className="label">Email</p>
                                <p className="text">{state.user.email}</p>
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
                    <CardHistoryDonate />
                </div>
            </div>
        </div>
    )
}

export default Profile
