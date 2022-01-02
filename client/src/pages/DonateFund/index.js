import { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar'
import DonateImg from '../../assets/image/donate-1.png';
import CardStatusDonate from '../../Components/Card/CardStatusDonate';
import ApproveModal from '../../Components/Modal/ApproveModal';
import DonateModal from '../../Components/Modal/DonateModal';
import ListDonate from '../../Components/DummyData/ListDonate';
import { useParams } from 'react-router-dom';
import { API } from '../../config/api';
import './donatefund.scss';
import '../Detail/detail.scss';

const DonateFund = () => {
    const [modalApprove, setModalApprove] = useState(false)
    const [modalDonate, setModalDonate] = useState(false)
    const [dataFund, setDataFund] = useState([])

    const {id} = useParams()

    const closeModalApprove = () => {
        setModalApprove(false)
    }
    const showModalApprove = () => {
        setModalApprove(true)
    }
    const closeModalDonate = () => {
        setModalDonate(false)
    }
    const showModalDonate = () => {
        setModalDonate(true)
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
                        <button onClick={() => showModalDonate()} className="btn btn-full btn-orange">Donate</button>
                    </div>
                </div>
            </div>
            <div className="list-donate">
                <h2>List Donation (200)</h2>
                {ListDonate.map((data,index) => (
                    <CardStatusDonate 
                        key={index}
                        showModal={showModalApprove} 
                        isButton={true}
                        name={data.name}
                        date={data.date}
                        total={data.total}
                    />
                ))}
                <p className="load-more">Load More</p>
            </div>
            <div className="list-donate">
                <h2>Donation has not been approved (10)</h2>
                {ListDonate.map((data,index) => (
                    <CardStatusDonate 
                        key={index}
                        showModal={showModalApprove} 
                        isButton={false}
                        name={data.name}
                        date={data.date}
                        total={data.total}
                    />
                ))}
                <p className="load-more">Load More</p>
            </div>
            <ApproveModal isOpen={modalApprove} closeModal={closeModalApprove} />
            <DonateModal isOpen={modalDonate} closeModal={closeModalDonate} />
        </div>
    )
}

export default DonateFund
