import React, {useContext, useState} from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input'
import Button from '../../Button'
import './loginmodal.scss';
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
        top: '106px',
        left: '33%',
        width : '417px',
        height : '385px',
    }
}

function LoginModal(props) {
    const {showModalRegister, isOpen, closeModal} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [, dispatch] = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {email,password}
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: data
        })
    }
    const toRegister = () => {
        closeModal()
        showModalRegister()
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={modalStyles}>
            <div className="login-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <div className="button-submit">
                        <Button type="submit" className="btn btn-full btn-orange" text="Login"/>
                    </div>
                    <div className="link">
                        <p onClick={() => toRegister()}>Don't have an account ? Klik <span>Here</span></p>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

LoginModal.propTypes = {
    isOpen : propTypes.bool,
    closeModal : propTypes.func,
    showModalRegister: propTypes.func
}
export default LoginModal
