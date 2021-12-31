import React from 'react'
import banner1 from '../../assets/image/banner-1.png'
import Button from '../Button'
import './banner.scss'

function Banner({showDonate}) {
    return (
        <div className="banner">
            <div className="banner-content">
                <h2>While you are still standing, try to reach out to the people who are falling.</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>    
                <Button 
                    className="btn btn-medium btn-gray"
                    text="Donate Now"
                    onClick={() => showDonate()}
                />
            </div>
            <div className="banner-image">
                <div className="card-banner-image">
                    <img src={banner1} alt="banner-image" />
                </div>
            </div> 
        </div>
    )
}

export default Banner
