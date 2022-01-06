import { useContext, useEffect, useState } from 'react';
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
import { UserContext } from '../../context/UserContext';

const DonateFund = () => {
    const [modalApprove, setModalApprove] = useState(false)
    const [modalDonate, setModalDonate] = useState(false)
    const [dataFund, setDataFund] = useState([])
    const [listDonateSuccess, setListDonateSuccess] = useState([])
    const [listDonatePending, setListDonatePending] = useState([])
    const [totalDonate, setTotalDonate] = useState(0)
    const [totalDonateSuccess, setTotalDonateSuccess] = useState(0)
    const [totalDonatePending, setTotalDonatePending] = useState(0)
    const [detailDonateData, setDetailDonateData] = useState([])
    const [changeData, setChangeData] = useState(false)
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        donateAmount: "",
        proofAttachment: "",
    })
    const [state] = useContext(UserContext)
    const {id} = useParams()

    const closeModalApprove = () => {
        setModalApprove(false)
    }
    const showModalApprove = async (donateId) => {
        try {
            console.log("donateId",donateId)            
            const response = await API.get(`/fund/${id}/${donateId}`, config)
            setDetailDonateData(response.data.data)
            console.log("detail Donate", detailDonateData)
            setModalApprove(true)
        } catch (error) {
            console.log(error)
        }
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
        try {
            const response = await API.get(`/fund/${id}`, config)
            setDataFund(response.data.data)
            setTotalDonate(response.data.data[0].usersDonate.length)
            console.log("Data Fund ==",dataFund)
            console.log("Data ==",response.data.data)
            if(response.data.data[0].usersDonate.length > 0){
                const dataSuccess = response.data.data[0].usersDonate.filter(donate => donate.status !== "pending")
                const dataPending = response.data.data[0].usersDonate.filter(donate => donate.status == "pending")
                setListDonateSuccess(dataSuccess)
                setListDonatePending(dataPending)
                setTotalDonateSuccess(dataSuccess.length)
                setTotalDonatePending(dataPending.length)
                
            }
            console.log("List Donate",listDonateSuccess)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitApprove = async (e,userId) => {
        try {
            setLoading(true)
            e.preventDefault();
            let response = await API.patch(`/fund/${id}/${userId}`,{'status' : 'success'}, config)
            closeModalApprove()
            setChangeData(!changeData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

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

    const handleSubmitDonate =async (e) => {
        try {
            setLoading(true)
            e.preventDefault();
            const config = {
                Headers: {
                  "Content-type": "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("donateAmount", form.donateAmount)
            formData.set("proofAttachment", form.proofAttachment[0], form.proofAttachment[0].name)

            const response = await API.post(`fund/${id}`,formData,config)
            console.log(response)
            closeModalDonate()
            setChangeData(!changeData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        detailFund()
    }, [changeData])

    return (
        <div>
            <Navbar />
            {dataFund  && dataFund.map(fund => { 
                return(
                    <div>
                        <div className="detail-donate">
                            <div className="detail-donate-image">
                                <img src={`http://localhost:5000/uploads/${fund.thumbnail}`} alt="detail-donate" />
                            </div>
                            <div className="card-donate-content">
                                <h2>{fund.title}</h2>
                                <div className="card-content">
                                    <div className="price-donate">
                                        <p className="start">Rp. 200.000</p>
                                        <p className="gathered">gathered from</p>
                                        <p className="end">Rp. {fund.goal}</p>
                                    </div>
                                    <div className="card-progres">
                                        <div className="progres-bar">
                                            <div className="bar"></div>
                                        </div>
                                    </div>
                                    <div className="donate-info">
                                        <p>{totalDonate} <span>Donation</span></p>
                                        <p>150 <span>More Day</span></p>
                                    </div>
                                    <div className="donate-desc">
                                        <p>{fund.description}</p>
                                    </div>
                                    <button onClick={() => showModalDonate()} className="btn btn-full btn-orange">Donate</button>
                                </div>
                            </div>
                        </div>
                        <div className="list-donate">
                            <h2>List Donation ({totalDonateSuccess})</h2>
                            {listDonateSuccess && listDonateSuccess.map(listDonate => {
                                return(
                                    <CardStatusDonate 
                                        key={listDonate.id}
                                        showModal={showModalApprove} 
                                        isButton={false}
                                        name={listDonate.fullName}
                                        date={listDonate.date}
                                        total={listDonate.donateAmount}
                                        
                                    />
                                )
                            })}
                            <p className="load-more">Load More</p>
                        </div>
                        <div className="list-donate">
                            <h2>Donation has not been approved ({totalDonatePending})</h2>
                            {listDonatePending && listDonatePending.map(listDonate => {
                                return(
                                    <CardStatusDonate 
                                        key={listDonate.id}
                                        donateId={listDonate.id}
                                        showModal={showModalApprove} 
                                        isButton={true}
                                        name={listDonate.fullName}
                                        date={listDonate.date}
                                        total={listDonate.donateAmount}
                                        detailDonateData= {detailDonateData}
                                    />
                                )
                            })}
                            <p className="load-more">Load More</p>
                        </div>
                        <ApproveModal 
                            isOpen={modalApprove} 
                            closeModal={closeModalApprove} 
                            data={detailDonateData}
                            handleSubmit={handleSubmitApprove}
                            loading={loading}
                        />
                        <DonateModal 
                            isOpen={modalDonate} 
                            closeModal={closeModalDonate} 
                            handleChange={handleChange}
                            handleSubmit={handleSubmitDonate}
                            preview={preview}
                            loading={loading}
                        />
                    </div>
                )
            })
            }
        </div>
    )
}

export default DonateFund
