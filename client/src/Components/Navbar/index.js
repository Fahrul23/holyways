import React, {useContext, useEffect, useState} from 'react'
import './Navbar.scss'
import logo from '../../assets/icon/Icon.png';
import userIcon from '../../assets/icon/user.png';
import money from '../../assets/icon/money.png';
import logout from '../../assets/icon/logout.png';
import Button from '../Button';
import profile from '../../assets/image/profile.png';
import Modal from 'react-modal';
import RegisterModal from '../Modal/RegisterModal';
import LoginModal from '../Modal/LoginModal';
import {Link} from "react-router-dom"
import { UserContext } from '../../context/UserContext';
import { API } from '../../config/api';

Modal.setAppElement('#root')

const Navbar = () => {
    
    const [state, dispatch] = useContext(UserContext)
    const [ModalRegister, setModalRegister] = useState(false)
    const [ModalLogin, setModalLogin] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [user, setUser] = useState([])
    const [change, setChange] = useState(false)

    const showModalRegister = () => {
        setModalRegister(true)
    }
    const showModalLogin = () => {
        setModalLogin(true)
    }
    const closeModalRegister = () => {
        setModalRegister(false)
    }
    const closeModalLogin = () => {
        setModalLogin(false)
    }

    const handleLogout = () => {
        dispatch({type: 'LOGOUT'})
    }

    const getUser = async() => {
        try {
            let response = await API.get('/user')
            setUser(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const dropdownActive = dropdown === true ? "active" : "non-active"

    useEffect(() => {
        closeModalLogin()
        closeModalRegister()
        setDropdown(false)
    },[state.isLogin])

    useEffect(() => {
        getUser()
    },[change])

    return (
        <div className="navbar">
            <div className="logo">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
            </div>
            <div className="nav-item">
                {state.isLogin === false ?  
                    <div className="auth">
                        <Button className="btn btn-medium btn-transparant" text="Login" onClick={() => setModalLogin(true)}/>
                        <Button className="btn btn-medium btn-gray" text="Register" onClick={() => setModalRegister(true)}/>
                    </div>
                    :
                    <div className="avatar" onClick={() => {setDropdown(!dropdown)}}>
                        <img src={user.image ? `http://localhost:5000/uploads/${user.image}` : profile} alt="profile" />
                    </div>
                }
            </div>
            <div className={`dropdown-wrapper ${dropdownActive}`}>
                <div className="dropdown">
                    <div className="triangle-wrapper">
                        <div className="triangle"></div>
                    </div>
                    <div className="item-wrapper active">
                        <div className="item">
                            <div className="icon">
                                <img src={userIcon} alt="user" />
                            </div>
                            <Link to="/profile">
                                <p>Profile</p>
                            </Link>
                        </div>
                        <div className="item">
                            <div className="icon">
                                <img src={money} alt="money" />
                            </div>
                            <Link to="/raisefund">
                                <p>Raise Fund</p>
                            </Link>
                        </div>
                        <div className="line"></div>
                        <div className="item" >
                            <div className="icon">
                                <img src={logout} alt="logout" />
                            </div>
                            <p onClick={handleLogout}>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
            <RegisterModal 
                isOpen={ModalRegister} 
                closeModal={closeModalRegister} 
                showModalLogin={showModalLogin}
                setChange={setChange}
            />
            <LoginModal 
                isOpen={ModalLogin} 
                closeModal={closeModalLogin} 
                showModalRegister={showModalRegister}
                setChange={setChange}
            />
        </div>
    )
}

export default Navbar
