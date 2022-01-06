import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Input from '../../Components/Input';
import Textarea from '../../Components/Input/Textarea';
import Button from '../../Components/Button';
import './raiseform.scss'
import { API } from '../../config/api';
import { useNavigate } from 'react-router-dom';

function RaiseFundForm() {
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        title: "",
        thumbnail: "",
        goal: "",
        description: "",
    })

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
        console.log(form)
    };
    

    const handleSubmit =async (e) => {
        setLoading(true)
        try {
            e.preventDefault();
            const config = {
                Headers: {
                  "Content-type": "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("title",form.title)
            formData.set("goal",form.goal)
            formData.set("description", form.description)
            formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name)
            
            const response = await API.post(`fund`,formData,config)
            navigate('/raisefund')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="header-wrapper">
                    <h2>Make Raise Found</h2>
                </div>
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <Input 
                            type="text" 
                            name="title"
                            placeholder="Title" 
                            onChange={handleChange}
                        />
                        <label class="custom-file-upload">
                            <Input 
                                type="file" 
                                name="thumbnail"
                                onChange={handleChange}
                            />
                            <p>Attache Thumbnail</p> 
                        </label>
                        {preview && (
                            <div className="image-preview">
                                <img src={preview} alt="preview" />
                            </div> 
                        )}
                        <Input 
                            type="number"
                            name="goal" 
                            placeholder="Goal"
                            onChange={handleChange}
                        />
                        <Textarea 
                            placeholder="Description" 
                            name="description"
                            onChange={handleChange}
                        />
                        <Button 
                            type="submit" 
                            className="btn btn-medium btn-orange" 
                            text="Public Fundraising"
                            loading={loading} 
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RaiseFundForm
