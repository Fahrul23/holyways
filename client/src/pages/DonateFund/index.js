import Navbar from '../../Components/Navbar'
import DonateImg from '../../assets/image/donate-1.png';
import CardStatusDonate from '../../Components/Card/CardStatusDonate';
import './donatefund.scss';
import '../Detail/detail.scss';
import { useState } from 'react';
import ApproveModal from '../../Components/Modal/ApproveModal';
import DonateModal from '../../Components/Modal/DonateModal';
import ListDonate from '../../Components/DummyData/ListDonate';

const DonateFund = () => {
    const [modalApprove, setModalApprove] = useState(false)
    const [modalDonate, setModalDonate] = useState(false)
    
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
    return (
        <div>
            <Navbar />
            <div className="detail-donate">
                <div className="detail-donate-image">
                    <img src={DonateImg} alt="detail-donate" />
                </div>
                <div className="card-donate-content">
                    <h2>The Strength of a People. Power of Community</h2>
                    <div className="card-content">
                        <div className="price-donate">
                            <p className="start">Rp. 25.000.000</p>
                            <p className="gathered">gathered from</p>
                            <p className="end">Rp. 200.000.000</p>
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
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
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
                        isButton={true}
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
