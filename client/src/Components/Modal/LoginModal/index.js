import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input'
import Button from '../../Button'
import './loginmodal.scss';
import { UserContext } from '../../../context/UserContext';
import Alert from '../../Alert';
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
        top: '106px',
        left: '33%',
        width : '417px',
        height : '385px',
    }
}

function LoginModal(props) {
    const {showModalRegister, isOpen, closeModal} = props
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
       
    });
    const [, dispatch] = useContext(UserContext)

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
            
            let response = await API.post('/login', form, config)

            if(response.status === 200){
                setLoading(false)        
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: response.data.data
                })
                closeModal()
            }

        } catch (error) {
            setLoading(false)
            setMessage("Login Failed")
        }
    }
    const toRegister = () => {
        closeModal()
        showModalRegister()
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
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <Input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        onChange={handleChange}/>
                    <Input 
                        type="password"
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange}
                    />
                    <div className="button-submit">
                        <Button 
                            type="submit" 
                            className="btn btn-full btn-orange" 
                            text="Login"
                            loading={loading}
                        />
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
