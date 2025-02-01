import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetCurrentUser } from '../api/users';
import { message } from 'antd';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const getValidUser =async() =>{
    try{
      const response = await GetCurrentUser();
      console.log(response);
      setUser(response.data);
    } catch(error){
      console.log(error);
      message.error(error.message);
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      getValidUser();
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
    <div>{user.name}</div>
    {children}
    </div>
  )
}

export default ProtectedRoute