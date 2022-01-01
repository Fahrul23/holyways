import Banner from '../../Components/Banner'
import Navbar from '../../Components/Navbar'
import './home.scss';
import bannerImg from '../../assets/image/banner-2.png'
import CardDonate from '../../Components/Card/CardDonate';
import { useEffect, useRef, useState } from 'react';
import donateData from '../../Components/DummyData/DonateData';
import { API } from '../../config/api';


function Home() {
    const refDonate = useRef()
    const [dataFund, setDataFund] = useState([])
    
    const config = {
        Headers: {
            "Content-type" : "aplication/json"
        }
    }
    
    const getFunds = async () => {
        let response = await API.get('funds', config)
        setDataFund(response.data.data.funds)
    }

    const showDonate = () => {
        window.scrollTo({
            top: refDonate.current.offsetTop - 100,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        getFunds()
    }, [])

    return (
        <div>
            <Navbar />
            <Banner showDonate={showDonate}/>
            <div className="info">
                <div className="info-image">
                    <div className="card-info-image">
                        <img src={bannerImg} alt="info" />
                    </div>
                </div> 
                <div className="info-content">
                    <h2>Your donation is very helpful for people affected by forest fires in Kalimantan.</h2>
                    <div className="info-content-item">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>    
                </div>
                <div className="donate"ref={refDonate}>
                    <h3>Donate Now</h3> 
                    <div className="donate-content">
                        {dataFund && 
                        dataFund.map((data,index) => {
                                return (
                                    <CardDonate 
                                        key={index}
                                        title={data.title}
                                        description={data.description}
                                        price={data.goal}
                                        image={data.thumbnail}
                                        button="Donate"
                                        link={`/detail/${data.id}`}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
