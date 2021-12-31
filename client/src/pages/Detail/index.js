import { useState } from 'react';
import Navbar from '../../Components/Navbar'
import './detail.scss';
import DonateImg from '../../assets/image/donate-1.png';
import CardStatusDonate from '../../Components/Card/CardStatusDonate';
import DonateModal from '../../Components/Modal/DonateModal';
import Button from '../../Components/Button';
import ListDonate from '../../Components/DummyData/ListDonate';

const Detail = () => {
    const [modalDonate, setModalDonate] = useState(false)
    
    const closeModalDonate = () => {
        setModalDonate(false)
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
                {ListDonate.map((data,index) => (
                    <CardStatusDonate 
                        key={index}
                        name={data.name}
                        date={data.date}
                        total={data.total}
                    />
                ))}
            </div>
        </div>
    )
}

export default Detail
