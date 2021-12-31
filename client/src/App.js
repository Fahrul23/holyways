
import { useContext, useEffect } from 'react';
import Router from './routes'
import {API, setAuthToken} from './config/api';
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';

if(localStorage.token) {
    setAuthToken(localStorage.token)
}


function App() {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext)
    // console.clear();
    console.log(state)

    useEffect(() => {        
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        if(state.isLogin === false){
            navigate("/");
        }
    }, [state])

    
    const checkUser = async () => {
        try {
        const config = {
            Headers: {
                "Content-type" : "aplication/json"
            }
        }
        const response = await API.get("/check-auth",config);

        if (response.status === 404) {
            dispatch({
                type: "AUTH_ERROR",
            });
        }

        let payload = response.data.data.user;
        payload.token = localStorage.token;
        
        dispatch({
            type: "USER_SUCCESS",
            payload,
        });
        } catch (error) {
           console.log(error);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);


    return (
        <Router />
    );
}

export default App;
