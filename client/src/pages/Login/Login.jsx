  import { useEffect } from 'react';
  import { Button, Flex, Form, Input, message } from 'antd';
  import { LoginUser } from '../../api/users';
  import { useNavigate } from 'react-router-dom';
  import Logo from '../../assets/Logo.png'
  
  const Login = () => {
    const navigate = useNavigate();
    const onFinish = async(values) => {
      try{
        const response = await LoginUser(values);
        if(response.status) {
          localStorage.setItem('token', response.token);
          navigate('/', {replace: true});
          message.success("You are logged in.");
        } else{
          console.log(response.message);
          message.error(response.message);
        }
      } catch(error) {
        console.log(error);
      }
    }
    useEffect(() => {
      if (localStorage.getItem('token')) {
        navigate("/", {replace: true});
      }
    }, []);
    
    return (
      
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
          <Flex vertical justify='center' align='center' gap='small'>
      <img src={Logo} width="60px"></img>
        <h1>Login to TopShow</h1>
        </Flex>
          </section>
          <section className="right-section">
            <Form
              layout='vertical'
              onFinish={onFinish}
            >
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block" rules={[{ required: true, message: "Email is required" }]}
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
                  type="password"
                  placeholder="Enter your Password"
                ></Input.Password>
              </Form.Item>
                <span className='d-block' onClick={() => navigate('/forgot-password')} 
                style={{marginTop:'-25px', marginBottom:'25px', textAlign:'left', color:'blue', fontStyle:'italic', fontWeight: 500, cursor:'pointer'}}>Forgot password?</span>
              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
              <span onClick={() => navigate('/register')}
                style={{fontWeight: 600, cursor: 'pointer'}}
              >New to TopShow? Click here to register.</span>
            </Form>
          </section>
        </main>
      </header>
    )
  }
  
  export default Login;
