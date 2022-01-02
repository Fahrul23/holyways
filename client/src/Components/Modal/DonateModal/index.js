import React, { useState } from 'react'
import Modal from 'react-modal';
import propTypes from "prop-types";
import Input from '../../Input';
import Button from '../../Button';
import donateImg from '../../../assets/image/donate-1.png'
import './donatemodal.scss';
import { API } from '../../../config/api';

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
        height: '392px'
        
    }
}


function DonateModal(props) {
    const {isOpen,closeModal,fundId,userId} = props
    const [preview, setPreview] = useState('')
    const [form, setForm] = useState({
        donateAmount: "",
        proofAttachment: "",
    })

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    
    };
    

    const handleSubmit =async (e) => {
        try {
            e.preventDefault();
            const config = {
                Headers: {
                  "Content-type": "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("fundId",parseInt(fundId))
            formData.set("userId", parseInt(userId))
            formData.set("donateAmount", form.donateAmount)
            formData.set("proofAttachment", form.proofAttachment[0], form.proofAttachment[0].name)

      
            const response = await API.post(`fund/${fundId}/${userId}`,formData,config)
            console.log(response)
            closeModal()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal()}
        style={{
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
                height: preview ? '392px' : '272px'
            }
        }}
        >
            <form onSubmit={handleSubmit}>
                <Input 
                    type="number" 
                    placeholder="Nominal Donation"
                    name="donateAmount" 
                    onChange={handleChange}
                />
                <div className="file-upload">
                    <label class="custom-file-upload-donation">
                        <Input 
                            type="file"
                            name="proofAttachment"
                            onChange={handleChange}
                        />
                        <p>Attach payment</p> 
                    </label>
                    <p class="text">*transfers can be made to holyways accounts</p>
                </div>
                {preview && (
                  <img
                    src={preview}
                    style={{
                      width: "150px",
                      height: "150px",
                      marginTop: -60,
                      marginBottom: 17
                    }}
                    alt="preview"
                  />
              )}
                <Button type="submit" class="btn btn-full btn-orange" text="Donate"/>
            </form>
        </Modal>
    )
}

DonateModal.propTypes = {
    isOpen : propTypes.bool,
    closeModal : propTypes.func,
}
export default DonateModal
