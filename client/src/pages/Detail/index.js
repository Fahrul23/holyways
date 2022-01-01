import { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar'
import './detail.scss';
import DonateImg from '../../assets/image/donate-1.png';
import CardStatusDonate from '../../Components/Card/CardStatusDonate';
import DonateModal from '../../Components/Modal/DonateModal';
import Button from '../../Components/Button';
import ListDonate from '../../Components/DummyData/ListDonate';
import { useParams } from 'react-router-dom';
import { API } from '../../config/api';

const Detail = () => {
    const [modalDonate, setModalDonate] = useState(false)
    
    const [dataFund, setDataFund] = useState([])

    const {id} = useParams()
    const closeModalDonate = () => {
        setModalDonate(false)
    }
    
    const config = {
        Headers :{
            "Content-type" : "aplication/json"
        }
    }

    const detailFund =async () => {
        const response = await API.get(`/fund/${id}`, config)
        setDataFund(response.data.data.fund)
    }

    useEffect(() => {
        detailFund()
        console.log("DataFund=====", dataFund)
    }, [])

    return (
        <div>
            <Navbar />
            <div className="detail-donate">
                <div className="detail-donate-image">
                    <img src={`http://localhost:5000/uploads/${dataFund.thumbnail}`} alt="detail-donate" />
                </div>
                <div className="card-donate-content">
                    <h2>{dataFund.title}</h2>
                    <div className="card-content">
                        <div className="price-donate">
                            <p className="start">Rp. 200.000</p>
                            <p className="gathered">gathered from</p>
                            <p className="end">Rp. {dataFund.goal}</p>
                        </div>
                        <div className="card-progres">
                            <div className="progres-bar">
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className="donate-info">
                            <p>200 <span>Donation</span></p>
                            <p>150 <span>More Day</span></p>
                        </div>
                        <div className="donate-desc">
                            <p>{dataFund.description}</p>
                        </div>
                        <Button 
                            className="btn btn-full btn-orange" 
                            text="Donate" 
                            onClick={() => setModalDonate(true)}
                            />
                        <DonateModal isOpen={modalDonate} closeModal={closeModalDonate} />
                    </div>
                </div>
            </div>
            <div className="list-donate">
                <h2>List Donation (200)</h2>
                {dataFund.usersDonate && dataFund.usersDonate.map((data,index) => (
                    <CardStatusDonate 
                        key={index}
                        name={data.fullName}
                        date={data.date}
                        total={data.donateAmount}
                    />
                ))} 
            </div>
        </div>
    )
}

export default Detail
