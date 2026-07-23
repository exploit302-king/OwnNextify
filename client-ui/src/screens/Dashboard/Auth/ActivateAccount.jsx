import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Loader from '../../../components/Loader'
import axios from 'axios'
import { errorToast, successToast, warningToast } from '../../../functions/messages'


const ActivateAccount = () => {
  const {token} = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      token && activateAccount();
  }, [token]);

  const activateAccount = async() =>{
    try {
      setLoading(true)
      const {data} = await axios.post(`/signup`, {token});
      if(data?.error) {
        setLoading(false)
        errorToast(data.error)
      }
      else {
        setLoading(false)
        successToast('Account created successfully, you are logged In! ')
        navigate('/')
      }

    } catch (error) {
      console.error(error.message)
      setLoading(false)
      warningToast('Failed to activate account' + error.message)
    }
  }

  return (
    <div>
      {loading && <Loader /> }
    </div>
  )
}

export default ActivateAccount
