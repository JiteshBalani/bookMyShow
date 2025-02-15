import { useState } from 'react';
import { Button, Flex, Form, Input, message } from 'antd'
import { RegisterUser } from '../../api/users'
import Logo from '../../../public/Logo.png'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  const onFinish = async(values) => {
    try{
      const response = await RegisterUser(values);
      localStorage.setItem('token', response.token);
      console.log(response);
      
      message.success('Registration successful! Logging you in...');
      setTimeout(() => {
        navigate('/', {replace: true});
      },1200)
    } catch(error) {
      message.error(error.response?.data?.message || 'Registration Failed!');
      console.error('Registration Error', error);
    }  
  }
  return (
    <header className="App-header">
   <main className="main-area mw-500 text-center px-3">
     <section className="left-section">
     <Flex vertical justify='center' align='center' gap='small'>
      <img src={Logo} width="60px"></img>
        <h1>Register to TopShow</h1>
        </Flex>
     </section>
     <section className="right-section">
       <Form
         layout='vertical'
         onFinish={onFinish}
       >
       <Form.Item
           label="Name"
           htmlFor="name"
           name="name"
           className="d-block" rules={[{ required: true, message: "Name is required" }]}
         >
           <Input
             id="name"
             type="text"
             placeholder="Enter your Name"
           ></Input>
         </Form.Item>
         <Form.Item
           label="Email"
           htmlFor="email"
           name="email"
           className="d-block" rules={[{ required: true, message: "Email is required" },
           {type: 'email', message: 'Please enter a valid email.'}]}
         >
           <Input
             id="email"
             type="text"
             placeholder="Enter your Email"
           ></Input>
         </Form.Item>
         <Form.Item
           label="Password"
           htmlFor="password"
           name="password"
           className="d-block"
           rules={[{ required: true, message: "Password is required" }]}
         >
           <Input.Password
             id="password"
             placeholder="Enter your Password"


           ></Input.Password>
         </Form.Item>
         <Form.Item className="d-block">
           <Button
             type="primary"
             block
             loading={loadings[0]} onClick={() => enterLoading(0)}
             htmlType="submit"
             style={{ fontSize: "1rem", fontWeight: "600" }}
           >
             Register
           </Button>
         </Form.Item>
         <span onClick={() => navigate('/login')}
                style={{fontWeight: 600, cursor: 'pointer'}}
              >Already a TopShow user? Click here to login.</span>
       </Form>
     </section>
   </main>
   </header>
  )
}

export default Register