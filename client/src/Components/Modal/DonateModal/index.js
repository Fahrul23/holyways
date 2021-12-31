import React from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input';
import Button from '../../Button';
import donateImg from '../../../assets/image/donate-1.png'
import './donatemodal.scss';

const modalStyles = { 
    overlay :{
        backgroundColor: 'rgba(4, 4, 4, 0.7)',
        zIndex: 1000,
    },
    content : {
        borderRadius:'10px',
        padding: '5px 34px',
        margin : 0,
        top: '106px',
        left: '33%',
        width : '484px',
        height: '272px'
        
    }
}

function DonateModal({isOpen,closeModal}) {
    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={modalStyles}>
            <form action="#">
                <Input type="number" placeholder="Nominal Donation" />
                <div className="file-upload">
                    <label class="custom-file-upload-donation">
                        <Input type="file" />
                        <p>Attach payment</p> 
                    </label>
                    <p class="text">*transfers can be made to holyways accounts</p>
                </div>
                <Button class="btn btn-full btn-orange" text="Donate"/>
            </form>
        </Modal>
    )
}

DonateModal.propTypes = {
    isOpen : propTypes.bool,
    closeModal : propTypes.func,
}
export default DonateModal
