import { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar'
import './detail.scss';
import DonateImg from '../../assets/image/donate-1.png';
import CardStatusDonate from '../../Components/Card/CardStatusDonate';
import DonateModal from '../../Components/Modal/DonateModal';
import Button from '../../Components/Button';
import ListDonate from '../../Components/DummyData/ListDonate';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../config/api';
import { UserContext } from '../../context/UserContext';

const Detail = () => {
    const [chageData, setChangeData] = useState(false)
    const [dataFund, setDataFund] = useState([])
    const [totalDonate, setTotalDonate] = useState()
    const [state] = useContext(UserContext)
    const [preview, setPreview] = useState('')
    const [modalDonate, setModalDonate] = useState(false)
    const [listDonate, setListDonate] = useState([])
    const [form, setForm] = useState({
        donateAmount: "",
        proofAttachment: "",
    })
    let navigate = useNavigate();
    
    const {id} = useParams()
    const closeModalDonate = () => {
        setModalDonate(false)
    }
    
    const detailFund =async () => {
        const config = {
            Headers :{
                "Content-type" : "aplication/json"
            }
        }
        try {
            const response = await API.get(`/fund/${id}`, config)
            setDataFund(response.data.data)
            setTotalDonate(response.data.data[0].usersDonate.length)
            const dataSuccess = response.data.data[0].usersDonate.filter(donate => donate.status !== "pending")
            setListDonate(dataSuccess)
            setTotalDonate(dataSuccess.length)
            closeModalDonate()
        } catch (error) {
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

    const handleSubmit =async (e) => {
        if(state.isLogin === false){
            navigate("/");
        }
        try {
            e.preventDefault();
            const config = {
                Headers: {
                  "Content-type": "multipart/form-data"
                }
            }
            const formData = new FormData()
            formData.set("fundId",id)
            formData.set("userId",state.user.id)
            formData.set("donateAmount", form.donateAmount)
            formData.set("proofAttachment", form.proofAttachment[0], form.proofAttachment[0].name)

            const response = await API.post(`fund/${id}/${state.user.id}`,formData,config)
            console.log(response)
            closeModalDonate()
            setChangeData(!chageData)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        detailFund()
        
     }, [chageData,id])

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
                                        <p>{totalDonate}<span> Donation</span></p>
                                        <p>150 <span>More Day</span></p>
                                    </div>
                                    <div className="donate-desc">
                                        <p>{fund.description}</p>
                                    </div>
                                    <Button 
                                        className="btn btn-full btn-orange" 
                                        text="Donate" 
                                        onClick={() => setModalDonate(true)}
                                        />
                                    <DonateModal 
                                        isOpen={modalDonate} 
                                        closeModal={closeModalDonate} 
                                        handleChange={handleChange}
                                        handleSubmit={handleSubmit}
                                        preview={preview}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="list-donate">
                            <h2>List Donation ({totalDonate})</h2>
                            {listDonate && listDonate.map(listDonate => {
                                return(
                                    <CardStatusDonate 
                                        key={listDonate.id}
                                        isButton={false}
                                        name={listDonate.fullName}
                                        date={listDonate.date}
                                        total={listDonate.donateAmount}     
                                    />
                                )
                            })} 
                        </div> 
                    </div>
                )
            })
            }
        </div>
    )
}


export default Detail
