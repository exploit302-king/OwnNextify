import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Loader from '../../../components/Loader'
import axios from 'axios'
import { errorToast, successToast, warningToast } from '../../../functions/messages'


const AccessAccount = () => {
  const {resetCode} = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    resetCode && accessAccount();
  }, [resetCode]);

  const accessAccount = async() =>{
    try {
      setLoading(true)
      const data = await axios.post(`${apis[0]}/access-account`);
      if(data?.error) {
        setLoading(false)
        errorToast(data.error)
      }
      else {
        setLoading(false)
        successToast('You are logged In! Now Please set a new Password ')
        navigate('/reset-password');

        // navigate('<h1> Kindly Change the Password </h1>')
      }

    } catch (error) {
      console.error(error.message)
      setLoading(false)
      warningToast('Failed to access account: ' + (error?.message || 'Unexpected error occurred'));

    }
  }

  return (
    <div>
      {loading && <Loader /> }
    </div>
  )
}

export default AccessAccount
