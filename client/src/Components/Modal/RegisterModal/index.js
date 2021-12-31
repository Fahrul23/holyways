import React, { useContext, useState } from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input';
import Button from '../../Button';
import './registermodal.scss';
import { UserContext } from '../../../context/UserContext';

const modalStyles = { 
    overlay :{
        backgroundColor: 'rgba(4, 4, 4, 0.7)',
        zIndex: 1000,
    },
    content : {
        borderRadius:'10px',
        paddingTop: '5px',
        margin : 0,
        paddingLeft: 0,
        paddingRight:0,
        top: '70px',
        left: '33%',
        width : '417px',
        height : '453px'
    }
}

function RegisterModal(props) {
    const {isOpen, closeModal, showModalLogin} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')

    const [, dispatch] = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {email,password,fullName}
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: data
        })
    }
    const toLogin = () => {
        closeModal()
        showModalLogin()
    }
 
    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={modalStyles}>
            <div className="login-wrapper">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <Input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)}/>
                    <div className="button-submit">
                        <Button type="submit" className="btn btn-full btn-orange" text="Register"/>
                    </div>
                </form>
                <div className="link">
                    <p onClick={toLogin}>Already have an account ? Klik <span>Here</span></p>
                </div>
            </div>
        </Modal>
    )
}

RegisterModal.propTypes = {
    isOpen : propTypes.bool,
    closeModal : propTypes.func,
    showModalLogin: propTypes.func
}

export default RegisterModal
