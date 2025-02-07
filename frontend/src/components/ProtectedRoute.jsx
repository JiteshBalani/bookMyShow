import { useState, useEffect } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { GetCurrentUser } from '../api/users';
import { Menu, Layout, message } from 'antd';
// import { Menu, message, Layout, Header } from 'antd';
import { Header } from 'antd/es/layout/layout';
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined
} from '@ant-design/icons';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children, adminOnly = false}) => {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login', {replace: true});
  }

  const navItems = [
    {
      key: "home",
      label: <span onClick={() => navigate('/')}>Home</span>,
      icon: <HomeOutlined />
    },
    {
      key: "user",
      label: `${user? user.name : ""}`,
      icon: <UserOutlined />,
      children:[
        {
          key: "profile",
          label: <span onClick={() => 
          user?.isAdmin ? navigate('/admin') : navigate('/profile')}>Profile</span>,
          icon: <ProfileOutlined />
        },
        {
          key: "logout",
          label: <span onClick={handleLogout}>Logout</span>,
          icon: <LogoutOutlined />
        }
      ]
    },
  ]


  const getValidUser = async() =>{
    try{
      const response = await GetCurrentUser();
      console.log(response);
      if(user !== response.data){
        setUser(response.data);
      }
      // setUser(response.data);
      // console.log(response.data.name);

      if(adminOnly && !response.data.isAdmin){
        message.error("You are not authorized to access this page");
        navigate('/');
        return;
      }
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
  }, [setUser]);

  return (
    <>
    <Layout>
      <Header
        className='d-flex justify-content-between cursor-pointer'
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          fontFamily: "montserrat"
        }}
      >
        <h3 className='demo-logo text-white m-0' style={{color: "white", fontSize: "20px", fontWeight: 600}} onClick={() => navigate('/')}>Book My Show</h3>
        <Menu theme='dark' mode='horizontal' items={navItems} style={{fontSize: "16px"}} selectedKeys={[]}/>
      </Header>
      <div style={{padding: 24, minHeight: 380, background: "#fff"}}>
        {children}
      </div>
    </Layout>
    </>
  )
}

export default ProtectedRoute