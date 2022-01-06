import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input';
import Button from '../../Button';
import Alert from '../../Alert';
import './registermodal.scss';
import { UserContext } from '../../../context/UserContext';
import { API } from '../../../config/api';

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
    const [, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
        fullName: ""
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        console.log(form)
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            e.preventDefault()
            const config = {
                Headers: {
                    "Content-type" : "aplication/json"
                }
            }
            let response = await API.post('/register', form, config)
            if(response.status === 201){
                console.log(response.data.data)
                setLoading(false)
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: response.data.data
                })
                closeModal()
            }else if(response.status === 400){
                console.log(response)            
            }

        } catch (error) {
            console.log(error.message)
            setMessage("Register Failed")
            setLoading(false)
        }
    }
    const toLogin = () => {
        closeModal()
        showModalLogin()
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage('')
        },4000)
    },[message])
 
    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={modalStyles}>
            {message ? <Alert message={message}/> : <div></div>}
            <div className="login-wrapper">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <Input 
                        type="email"
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange}
                    />
                    <Input 
                        type="password"
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange}    
                    />
                    <Input 
                        type="text" 
                        name="fullName"
                        placeholder="Full Name" 
                        onChange={handleChange}
                    />
                    <div className="button-submit">
                        <Button 
                            type="submit" 
                            className="btn btn-full btn-orange" 
                            text="Register"
                            loading={loading}
                        />
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
