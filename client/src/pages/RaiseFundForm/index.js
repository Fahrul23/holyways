import React from 'react';
import Navbar from '../../Components/Navbar';
import Input from '../../Components/Input';
import Textarea from '../../Components/Input/Textarea';
import Button from '../../Components/Button';
import './raiseform.scss'

function RaiseFundForm() {
    return (
        <div>
            <Navbar />
            <div className='wrapper'>
                <div className="header-wrapper">
                    <h2>Make Raise Found</h2>
                </div>
                <div className="form-wrapper">
                    <form action="">
                        <Input type="text" placeholder="Title" />
                        <label class="custom-file-upload">
                            <Input type="file" />
                            <p>Attache Thumbnail</p> 
                        </label>
                        {/* <div className="image-preview">
                            <img src={donateImg} alt="image-preview" />
                        </div> */}
                        <Textarea placeholder="Description" />
                        <Button type="submit" className="btn btn-medium btn-orange" text="Public Fundraising" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RaiseFundForm
