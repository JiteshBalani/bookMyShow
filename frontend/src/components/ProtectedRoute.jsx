import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GetCurrentUser } from '../api/users';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();

  const getValidUser =async() =>{
    try{
      const response = await GetCurrentUser();
      console.log(response);
    } catch(error){
      console.log(error);
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
    {children}
    </div>
  )
}

export default ProtectedRoute