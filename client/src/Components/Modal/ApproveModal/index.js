import React from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input';
import Button from '../../Button';
import donateImg from '../../../assets/image/donate-4.png'
import './approvemodal.scss';

const modalStyles = { 
    overlay :{
        backgroundColor: 'rgba(4, 4, 4, 0.7)',
        zIndex: 1000,
    },
    content : {
        borderRadius:'10px',
        padding: '5px 34px',
        margin : 0,
        top: '30px',
        left: '33%',
        width : '484px',
        height: '560px'
        
    }
}

function ApproveModal({isOpen,closeModal, data, handleSubmit}) {
    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={modalStyles}>
            {data ? 
                 <form onSubmit={(e) => handleSubmit(e,data.id)}>
                     <h4 class="name">{data.name}</h4>
                     <Input type="readonly" placeholder="Nominal Donation" value={data.amount} />
                     <div className="image-file">
                         <img src={`http://localhost:5000/uploads/${data.image}`} alt="image-file" />
                     </div>
                     <Button type="submit" class="btn btn-full btn-orange" text="Approve"/>
                 </form>
            : <div>Loading</div> }
        </Modal>
    )
}

ApproveModal.propTypes = {
    isOpen : propTypes.bool,
    closeModal : propTypes.func,
}
export default ApproveModal
