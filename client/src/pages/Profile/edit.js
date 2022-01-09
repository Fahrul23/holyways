import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import Input from '../../Components/Input'
import Navbar from '../../Components/Navbar'
import { API } from '../../config/api'

function EditProfile() {
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState('')
    const [user, setUser] = useState([])
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        image: ""
    })
    const navigate = useNavigate()
    const getUser = async () => {
        try {
            const config = {
                Headers: {
                  "Content-type": "aplication/json"
                }
            }
            let response = await API.get('/user', config)
            let data = response.data.data
            setForm({
                fullName : data.fullName,
                email: data.email,
                phone: data.phone,
            })
            console.log("data form",form.email)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.type == "file" ? e.target.files : e.target.value
        })

        if(e.target.type === "file"){
            let imagePreview = URL.createObjectURL(e.target.files[0])
            setPreview(imagePreview)
        }

        console.log("onchange input", form.image)
        console.log("onchange input", form)
    }
    
    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            e.preventDefault();
            const config = {
                Headers: {
                  "Content-type": "multipart/form-data"
                }
            }
            let Formdata = new FormData()
            Formdata.set('fullName',form.fullName)
            Formdata.set('email',form.email)
            Formdata.set('phone',form.phone)
            if(form.image){
                Formdata.set('image', form.image[0], form.image[0].name)
            }

            let response = await API.put('/edit-profile',Formdata, config)
            setLoading(false)
            const id = response.data.data.id
            console.log("id" ,id)
            navigate(`/profile/${id}`)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() =>{
        getUser()
    },[])

    return (
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="header-wrapper">
                    <h2>Edit Profile</h2>
                </div>
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <Input 
                            type="text" 
                            name="fullName"
                            placeholder="Full Name" 
                            onChange={handleChange}
                            value={form.fullName}
                        />
                        <Input 
                            type="text" 
                            name="email"
                            placeholder="Email" 
                            onChange={handleChange}
                            value={form.email}

                        />
                        <label class="custom-file-upload">
                            <Input 
                                type="file" 
                                name="image"
                                onChange={handleChange}
                            />
                            <p>Image Profile</p> 
                        </label>
                        {preview && (
                            <div className="image-preview">
                                <img src={preview} alt="preview" />
                            </div> 
                        )}
                        <Input 
                            type="text" 
                            name="phone"
                            placeholder="phone" 
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <Button 
                            type="submit" 
                            className="btn btn-medium btn-orange" 
                            text="Update Profile"
                            loading={loading} 
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
